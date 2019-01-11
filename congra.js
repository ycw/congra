// https://www.khronos.org/files/webgl/webgl-reference-card-1_0.pdf
// http://twgljs.org/docs/

// Input stops array must be sorted by user
// 1) It is faster for each render call w/o sorting
// 2) Dup. `offset` to produce no-transition. ConGra should not re-order.

// Caching stopOffsets[] and stopColors[] by hashkey `stops` is a mistake.
// ConGra will wrongly select the cached ones even if `stops[]` elements
// are mutated. "Caching" is removed.

const ConGra = (function () {

    function getContext({ width, height, gl }) {
        let canvas = gl ? gl.canvas : document.createElement(`canvas`);
        canvas.width = width;
        canvas.height = height;
        return canvas.getContext(`webgl`, { premultipliedAlpha: false });
    }

    function createVShaderSource() {
        return `attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }\n`;
    }

    function createFShaderSource({ maxStops = 32 }) {
        const elseBranches = [];
        for (const i of Array(maxStops).keys()) {
            if (i == 0)
                continue;
            elseBranches.push(`
    else if (stopOffsets[${i}] >= ang) {
      float ratio = (ang - stopOffsets[${i - 1}])/(stopOffsets[${i}] - stopOffsets[${i - 1}]);
      gl_FragColor = mix(stopColors[${i - 1}], stopColors[${i}], ratio);
    }`);
        }

        return `precision lowp float;
    const float PI = ${Math.PI};
    uniform vec2 resolution;
    uniform vec2 position;
    uniform vec4 stopColors[${maxStops}];
    uniform float stopOffsets[${maxStops}];
    uniform bool isRepeat;
    uniform float lastStopOffset;
    uniform float angle; // offset of start angle; cw
    
    void main() {
      vec2 v = position - gl_FragCoord.xy / resolution;
      float ang = atan(
          1.0 - gl_FragCoord.y/resolution.y - position.y,
          gl_FragCoord.x / resolution.x - position.x
          );
      ang += PI / 2.0;
      if (ang < 0.0) { 
        ang = PI * 2.0 + ang;
      }
      ang = ang / (PI * 2.0); // in turn space (ie. 0..1)
      ang = fract(-angle + ang);
      if (isRepeat) {
        ang = mod(ang, lastStopOffset);
      }
        
      if (stopOffsets[0] >= ang) {
        gl_FragColor = stopColors[0];
      }
      ${elseBranches.join('')}
    }`
    }

    function toBlobURL({ canvas, mimeType, quality }) {
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (blob)
                    resolve(URL.createObjectURL(blob));
                else
                    reject(new Error(`no blob`));
            }, mimeType, quality);
        });
    }

    function toDataURLPromise({ canvas, mimeType, quality }) {
        return Promise.resolve(canvas.toDataURL(mimeType, quality));
    }

    return function ({ width, height, maxStops, twgl }) {

        // get gl context
        let gl = getContext({ width, height });

        // create vshader source
        const vss = createVShaderSource();

        // create fshader source
        const fss = createFShaderSource({ maxStops });

        // create gl program
        let programInfo = null;

        // create buffers
        let bufferInfo = null;

        // render fn
        // @param gradients {angle, position, stops}[]
        // where angle float - 0..1
        // where position float[2]
        // where stops {offset, color}[]
        //    where offset float - 0..1
        //    where color float[4]
        const render = (gradients) => {
            const resolution = [gl.canvas.width, gl.canvas.height];
            const passes = [];

            for (const [gradientIndex, gradient] of gradients.entries()) {
                const { angle, position, stops, isRepeat } = gradient;

                const desiredStopCount = isRepeat
                    ? stops.length
                    : stops[stops.length - 1].offset == 1 // has provided color stop at 1.0
                        ? stops.length
                        : stops.length + 1;

                if (desiredStopCount > maxStops) {
                    throw new Error(`gradients[${gradientIndex}] has ${desiredStopCount} color stops (max=${maxStops})`);
                }

                const stopOffsets = [];
                const stopColors = [];

                for (const { offset, color } of stops) {
                    stopColors.push(...color);
                    stopOffsets.push(offset);
                }

                const lastGivenColor = stops[stops.length - 1].color;

                for (const i of Array(maxStops + 1 - desiredStopCount).keys()) {
                    stopOffsets.push(1.0);
                    stopColors.push(...lastGivenColor);
                }

                passes.push({
                    angle: angle || 0.0,
                    position: position || [0.5, 0.5],
                    stopOffsets,
                    stopColors,
                    isRepeat: Boolean(isRepeat),
                    desiredStopCount
                });
            }

            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.useProgram(programInfo.program);
            twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
            for (const { angle, position, stopColors, stopOffsets, isRepeat, desiredStopCount } of passes) {
                twgl.setUniforms(programInfo, {
                    resolution,
                    angle, position, stopColors, stopOffsets, isRepeat,
                    lastStopOffset: stopOffsets[desiredStopCount - 1]
                });
                twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLE_FAN);
            }
        };

        // resize context
        const resize = ({ width, height }) => {
            gl = getContext({ width, height, gl });
            programInfo = twgl.createProgramInfo(gl, [vss, fss]);
            bufferInfo = twgl.createBufferInfoFromArrays(gl, {
                aPosition: {
                    numComponents: 2,
                    data: [-1, -1, -1, 1, 1, 1, 1, -1] // tri-fan
                }
            });
        };

        // to build `gl`, `programInfo` and `bufferInfo`
        resize({ width, height });

        // dump `toBlob` URL; fallback to `toDataURL` URL
        // @return Promise{} 
        const toURL = ({ mimeType, quality } = {}) => {
            return gl.canvas.toBlob
                ? toBlobURL({ canvas: gl.canvas, mimeType, quality })
                : toDataURLPromise({ canvas: gl.canvas, mimeType, quality });
        }


        return {
            get gl() { return gl; }, // get current `gl` 
            maxStops, // back ref.
            render, // draw conic-gradient in current `gl`
            resize, // re-create new `gl` to fit new size
            toURL // dump object url, @return Promise{}
        }
    }
}());

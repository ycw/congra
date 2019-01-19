const twglDataMap = new WeakMap();

const N_STOP = 16;
const vss = `
attribute vec2 position; 
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;
const fss = `
precision mediump float;
uniform vec2 resolution;
uniform vec4 colors[${N_STOP}];
uniform vec2 hints[${N_STOP}];
uniform float offsets[${N_STOP}];
uniform float fromAngle;
uniform vec2 atPosition;
uniform bool repeating;
uniform int stopCount;
uniform float lastOffset;
void main() {
    float angle = atan(resolution.y - gl_FragCoord.y - atPosition.y * resolution.y, 
        gl_FragCoord.x - atPosition.x * resolution.x);

    // normalize
    angle /= ${Math.PI * 2};

    // 0deg should start from the North
    angle += 0.25; 
    if (angle < 0.0) { angle += 1.0; }

    // tune
    angle = fract(angle - fromAngle);

    // map to a 'short' range
    if (repeating) { angle = mod(angle, lastOffset); }

    // output color
    vec4 oc;
   
    for (int i = 0; i < ${N_STOP}; i++) {

        if (i == stopCount) {
            oc = colors[i - 1];
            break;
        }

        if (offsets[i] >= angle) {

            if (i == 0) {
                oc = colors[0];
                break;
            }
                
            vec4 colorA = colors[i -1];
            vec4 colorB = colors[i];
            vec2 hintPair = hints[i - 1];
        
            // guard DIV0 see below
            if (hintPair[0] == hintPair[1]) {
                if (angle > hintPair[1]) { oc = colorB; }
                else { oc = colorA; }
                break;
            }
                    
            float offsetA = offsets[i - 1];
            float H = (hintPair[0] - offsetA) / (hintPair[1] - offsetA);
            float P = (angle - offsetA) / (hintPair[1] - offsetA);
            float C = pow(P, log(0.5) / log(H)); // may DIV0
            oc = mix(colorA, colorB, C);
            break;
        }
    }
    gl_FragColor = oc;
}
`



//
// create gl context
//
function createContext({
    width = 128,
    height = 128,
    premultipledAlpha = true,
    antialias = true
} = {}) {
    const gl = document.createElement('canvas')
        .getContext('webgl', { premultipledAlpha, antialias });

    gl.canvas.width = width;
    gl.canvas.height = height;

    const programInfo = twgl.createProgramInfo(gl, [vss, fss]);
    const bufferInfo = twgl.createBufferInfoFromArrays(gl, {
        position: { numComponents: 2, data: [-1, -1, -1, 1, 1, 1, 1, -1] }
    });
    const bufferInfoDrawMode = gl.TRIANGLE_FAN;

    twglDataMap.set(gl, {
        programInfo,
        bufferInfo,
        bufferInfoDrawMode
    });

    return gl;
}



//
// render 
// @param gl: WebGLRenderingContext{}
// @param data:
// - angle        // float; normalized outside 0..1 is ok
// - position     // {x,y}; normalized
// - repeating    // bool;
// - stops {
//     colors[]   // [1,0,0,1 , 1,0,1,1  ... 0,0,0,0,  1,1,1,1]
//     hints[]    // [0.25,0.5, 0.65,0.8 ... 0.9,1.0]
//     offsets[]  // [0       , 0.5      ... 0.8    ,      1.0]
// - }
//
function render(gl, data) {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    const {
        programInfo,
        bufferInfo,
        bufferInfoDrawMode
    } = twglDataMap.get(gl);

    const { colors, hints, offsets } = data.stops;

    const uniforms = {
        resolution: [gl.canvas.width, gl.canvas.height],
        fromAngle: data.angle,
        atPosition: [data.position.x, data.position.y],
        colors,
        hints,
        offsets,
        repeating: data.repeating,
        stopCount: offsets.length,
        lastOffset: offsets[offsets.length - 1]
    };

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo, bufferInfoDrawMode);
}

export default {
    render,
    createContext
};

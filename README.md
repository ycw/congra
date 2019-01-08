# Congra
CSS conic gradient polyfill by webgl

# Dependencies
```html
<script src='twgl.js'></script><!--https://github.com/greggman/twgl.js-->
<script src='congra.js'></script>
<script src='congra.polyfill.js'></script>
```

# Basic Usage
```css
body {
  min-height: 100vh;
  --cg1: conic-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
  background-image: var(--cg1);
}
```
To CodePen users, if you find that modified css does not live update anymore, you should stop css-injection by adding a special comment like this.
```css
/* CP_DoFullRefresh */
```
See https://blog.codepen.io/2016/06/06/force-demo-fully-refresh-special-css-comment/

# Support & Limitation
- `repeating-` (optional) supported
- `from <angle>` (optional) supported ... `angle` can be in `%|deg|turn`
- `at <x> <y>`  (optional) supported ... `x/y` can only be in `%`
- `<color> <offset>, ..` (at least 1) ... `color` can only be `rgba()`; 
                                          `offset` (optional) can be in `%|deg|turn`

# More Examples
- Omiting `from` clause implies `angle = 0deg`
- Omiting `at` clause implies `x = 50%, y = 50%`
- Omiting `offset` will be auto-calculated.
```css 
body {
  --cg1:conic-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
  /* angle = 0
     x = 50%
     y = 50%,
     color stop list = rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%
  */
}
```

If a color stop is at wrong location, Congra will ignore just the wrong one. Ex
```css
body {
   --cg1:conic-gradient(
     rgba(0,0,0,0) 90deg,   /* ok                     */  
     rgba(0,0,0,0),         /* ok; omit = auto-calc   */
     rgba(0,0,0,0) 20deg,   /* ignore; 20deg < 90deg  */
     rgba(0,0,0,0) 75%,     /* ok; 75%=270deg > 90deg */
     rgba(0,0,0,0)          /* ok; omit = auto-calc   */
   );
}
```

# Under the Hood
Congra finds elements that have custom properties "--cgN" (N=1,2,3..), then Congra parses property values.
Each parsed value is sent to renderer to draw a gradient bitmap. Resolution of bitmap is equal to the element's bounding client rectangle. Finally, Congra creates image URLs for each bitmap and stores it back to element's custom property "--cgN".

```css
body {
  --cg1: url(blob:..);
}
```

Since CSS custom property is inherited by default, Congra may create bitmaps for elements that never consume.
Ex. Given HTML
```html
<article class='parent'>
  <h1 class='childA'>
    <em class='childA-child'></em>
  </h1>
  <p class='childB'></p>
</article>
```
```css
.parent {
  --cg1: conic-gradient(..);
  background-image: var(--cg1);
  width: 400px;
  height: 400px;
}
.childA {         /* childA inherits `--cg1` */
  --cgAllow: no;  /* this stops Congra from creating gradient bitmap */
}
.childA-child {   /* childA inherits `--cg1` and `--cgAllow` */
  --cgAllow: yes; /* re-allow Congra to create gradient bitmap (100x100) */
  width: 100px;
  height: 100px;
}
.childB {                      
  /* childB inherits `--cg1` property. */ 
  /* Congra will create a 200x200 bitmap */
  backround-image: var(--cg1); 
  width: 200px;
  height: 200px;
}
```

# congra.js 
`congra.js` exposes `ConGra` fn in global, it is the render core util. You can use it standalone.
E.g. render smooth animation by directly manipulating gl context. 

```js
const cg = ConGra({
  width,    // bitmap width
  height,   // bitmap height
  maxStops, // optional(defaults 4) fshader supports <maxStops>(inc.) color stops;
  twgl      // inject twgljs
});

cg.render([{ // IGradient
  isRepeat,  // bool - is drawing re-use color stops? default false
  angle,     // float - normalized(===in trun, 0.125 = 45deg) default 0.0
  position,  // [float, float] normalized, default [0.5, 0.5]
  stops      // {offset:float, color:float[4]}[]  
             // offset normalized; 
             // color channels normalized (e.g. [1,0,0,1] = opaque red)
}, {
  ..         // other gradients will draw ontop on same canvas
}]);         // render() will throw if required stops count > maxStops

cg.resize({  // resize current canvas and get new piece of gl context
  width,     // new bitmap width 
  height     // new bitmap height
});

cg.toURL()        // return Promise{} 
  .then(url=>)    // resolve: `url` is a blob URL if `canvas.toBlob()` is supported,
                  //          data URL otherwise(for Edge)
  .catch(e=>)     // reject : toBlob() failed (hint: canvas is 0width or 0height)

cg.gl        // getter, return current WebglRenderingContext{}
cg.maxStops  // back ref
cg.gl.width  // current canvas width
cg.gl.height // current canvas height
```

# congra.polyfill.js
`congra.polyfill.js` exposes `ConGraCSSParser` object. It contains only one method, `parse`. It'll...
1. collect custom properties(e.g. `--cg1`, `--cg2` etc)
2. parse `conic-gradient(..)`(string) into `IGradient`
3. pass `IGradient{}` to `cg.render(..)` and then `cg.toURL()`
4. put image url back to custom properties(e.g. `--cg1:url(blob:..)`)

```js
ConGraCSSParser.parse({
  prefix,     // default '--cg' 
  maxImages,  // default 16     probing `--cg1`, `--cg2`, ..., `--cg16`
  suffix,     // default ''     e.g. if suffix is '-i', output bitmap url will inject to '--cg1-i'
  root        // default document.body(include)    where to select candidate elements
});
```

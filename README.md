css conic gradient polyfill by webgl; 
[demo](https://codepen.io/ycw/pen/yGEYGw) @CodePen



# dependencies

- `twgl.js`: "A Tiny WebGL helper Library" by https://github.com/greggman/twgl.js



# usage
html
```html
<script src='twgl.js'></script>
<script src='congra.bundled.min.js'></script>
```
css
```css
body {
  min-height: 100vh;
  --cg1: conic-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  background-image: var(--cg1);
}
```



# support & limitation

```
feature          supported    limitation   default
-------          ---------    ----------   -------
repeating-       yes          n/a          n/a      
from <angle>     yes          %|deg|turn   0%
at <x> <y>       yes          %            50% 50%
COLORSTOP
  <color>        yes          rgba()       n/a
  <hint>         no           n/a          n/a
  <offset>       yes          %|deg|turn   ''
```

Note, unitless zero is not supported. 
```css
body {
  --cg1: conic-gradient(rgba(0,0,0,0) 0, ..); /* should be `rgba(0,0,0,0) 0%`  */
  --cg2: conic-gradient(from 0, ..);          /* should be `from 0%`           */
  --cg3: conic-gradient(at 0 0, ..);          /* should be `at 0% 0%`          */
}
```



# special notes

To CodePen users, you should stop css-injection feature in order to trigger *live* preview by adding this special comment
```css
/* CP_DoFullRefresh */
```
See https://blog.codepen.io/2016/06/06/force-demo-fully-refresh-special-css-comment/

To LessCSS users, you should preserve `rgba()` annotation by using http://lesscss.org/#escaping or simply fade alpha to `0.9999..`.
```lesscss
@red   : ~'rgba(255, 0, 0, 1)`;  // escaping
@black : rgba(0, 0, 0, 0.999)`;  // almost-fullopaque
body {
  --cg1      : conic-gradient(@red, @black);
  background : var(--cg1);
}
```



# more examples

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

If a color stop is at wrong location, Congra will ignore just the wrong one. 
*Caution*: this behavior is *different* from one defined in spec.
Ex
```css
body {
   --cg1:conic-gradient(
     rgba(0,0,0,0) 90deg,   /* ok                       */  
     rgba(0,0,0,0),         /* ok;     auto-calc        */
     rgba(0,0,0,0) 20deg,   /* ignore; 20deg < 90deg    */
     rgba(0,0,0,0) 30deg,   /* ignore; 30deg < 90deg    */
     rgba(0,0,0,0) 75%,     /* ok;     75% = 270deg     */
     rgba(0,0,0,0)          /* ok;     auto-calc        */
   );
}
```



# under the hood
Congra finds elements that have custom properties "--cgN" (N=1,2,3..), then Congra parses property values.
Each parsed value is sent to renderer to draw a gradient bitmap. Resolution of bitmap is equal to the element's bounding client rectangle. Finally, Congra creates image URLs for each bitmap and stores it back to element's custom property "--cgN".
Input custom property becomes ...
```css
body {
  --cg1: url(blob:..);
}
```

Way to stopping Congra from creating useless bitmap. Ex
Given
```html
<article class='feature-article'>
  <h1 class='i-dont-use-conic-gradient'>
    <em class='i-use-the-conic-gradient'></em>
  </h1>
</article>
```
Then
```css
.feature-article { 
  --cg1: conic-gradient(..);
  background-image: var(--cg1);
  width: 400px;
  height: 400px;
}

.i-dont-use-conic-gradient {
  --cgAllow: no;  /* stops Congra from creating gradient bitmap */
}

.i-use-conic-gradient {
  --cgAllow: yes; /* re-allow */
  width: 100px;
  height: 100px;
}
```


# bundle

## congra.js 
`congra.js` exposes `ConGra()` in global, it creates congra render contexts. You can use it standalone,
e.g, rendering smooth animation by directly manipulating its gl context. 

```js
const cg = ConGra({
  width,          // bitmap width; can be changed by `.resize()`
  height,         // bitmap height; ditto
  maxStops,       // optional(defaults 32); color stops that frgshader supports.
  twgl            // inject the twgljs tool
});

cg.render([{      // IGradient
  isRepeat,       // bool - default false
  angle,          // float - normalized, e.g. 0.125 -> 45deg; default 0.0
  position,       // float[2] - normalized; default [0.5, 0.5]
  stops           // { 
                  //   offset,   // float - 0.0 can be omitted, 1.0 auto gen sliently
                  //   color     // float[4] - normalized, e.g. [1,0,0,1] -> opaque red
                  // }[1+]
}, {
  ..              // other gradients will draw ontop on same canvas
}]);              // render() will throw if required stops count > maxStops

cg.resize({       // resize current canvas
  width,          // target bitmap width 
  height          // target bitmap height
});

cg.toURL()        // return Promise{} 
  .then(url=>..)  // resolve: `url` is a blob URL if `canvas.toBlob()` is supported,
                  //          data URL otherwise(for Edge)
  .catch(er=>..)  // reject : `toBlob()` fails, e.g. 0-height canvas

cg.gl             // getter, return current WebglRenderingContext{}
cg.maxStops       // back ref.
cg.gl.width       // current canvas width
cg.gl.height      // current canvas height
```



## congra.parser.js

It exposes `ConGra.parser`.
```js
const cssstr = `conic-gradient(from 0% at 50% 50%, rgba(0,0,0,0), rgba(255,0,0,1))`;
const parser = ConGra.parser;
const gradient = parser.parse(cssstr);

gradient;   // IGradient {
            //   isRepeat: false,
            //   angle: 0.0,
            //   position: [0.5, 0.5],
            //   stops: [
            //     { color:[0.0, 0.0, 0.0, 0.0], offset: 0.0 },
            //     { color:[1.0, 0.0, 0.0, 1.0], offset: 1.0 }
            //   ]
            // }
```



## congra.polyfill.js

It exposes `ConGra.polyfill(option)`.

Options
```js
ConGra.polyfill({
  inputPrefix,       // string  - custom prop prefix, e.g. `--cg`
  maxImage,          // integer - max bitmap count per dom elm
  outputSuffix,      // string  - custom prop suffix, e.g. `-i`, img url will be injected to `--cg1-i`
  root               // dom elm - starting point (include itself)
});
```


### congra.polyfill.auto.js

It calls `ConGra.polyfill()`.

```js
ConGra.polyfill({
    inputPrefix: `--cg`,
    maxImage: 32,
    outputSuffix: ``,
    root: document.body
})
```

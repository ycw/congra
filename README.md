# congra
CSS conic gradient polyfill by webgl

# deps (in order)
<script src='twgl.js'></script>
<script src='congra.min.js'></script>
<script src='congra.polyfill.min.js'></script>

# usage
```css
body {
  min-height: 100vh;
  --cg1: conic-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
  background-image: var(--cg1);
}
```

import Parser from './congra.parser.js'
import Renderer from './congra.renderer.js'

// minimal test 

const gl = Renderer.createContext({
    width:128,   // default 128
    height:128,  // default 128
    premultipledAlpha:true, // default true
    antialias: true // default true
});

const str = `conic-gradient(#ff0000 40%, lime 0deg 75%, rgba(0,0,255,0.7) 0deg)`;
const data = Parser.parseConicGradientFn(str);

if (!data) {
    alert(`input "${str}" is bad syntax`);
}
else {
    gl.clear(gl.COLOR_BUFFER_BIT);
    Renderer.render(gl, data);
    document.body.append(gl.canvas);
}
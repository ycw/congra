parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"dAsd":[function(require,module,exports) {
"use strict";function e(){var r=z(["/s*,s*(",")/yi"],["/\\s*,\\s*(",")/yi"]);return e=function(){return r},r}function r(){var e=z(["/","/yi"]);return r=function(){return e},e}function n(){var e=z(["/ats+(",")(?:s+(","))?/i"],["/at\\s+(",")(?:\\s+(","))?/i"]);return n=function(){return e},e}function t(){var e=z(["/froms+(",")/i"],["/from\\s+(",")/i"]);return t=function(){return e},e}function a(){var e=z(["/(?:(",")(s+",")?(s+",")?)|(",")/"],["/(?:(",")(\\s+",")?(\\s+",")?)|(",")/"]);return a=function(){return e},e}function o(e){return s(e)||u(e)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function u(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function s(e){if(Array.isArray(e)){for(var r=0,n=new Array(e.length);r<e.length;r++)n[r]=e[r];return n}}function l(){var e=z(["/#(","{3})/i"]);return l=function(){return e},e}function f(){var e=z(["/#(","{6})/i"]);return f=function(){return e},e}function c(){var e=z(["/hsla(s*(",")s*,s*(",")s*,s*(",")s*,s*(",")s*)/"],["/hsla\\(\\s*(",")\\s*,\\s*(",")\\s*,\\s*(",")\\s*,\\s*(",")\\s*\\)/"]);return c=function(){return e},e}function d(){var e=z(["/hsl(s*(",")s*,s*(",")s*,s*(",")s*)/"],["/hsl\\(\\s*(",")\\s*,\\s*(",")\\s*,\\s*(",")\\s*\\)/"]);return d=function(){return e},e}function g(){var e=z(["/rgba(s*(",")s*,s*(",")s*,s*(",")s*,s*(",")s*)/i"],["/rgba\\(\\s*(",")\\s*,\\s*(",")\\s*,\\s*(",")\\s*,\\s*(",")\\s*\\)/i"]);return g=function(){return e},e}function h(){var e=z(["/rgb(s*(",")s*,s*(",")s*,s*(",")s*)/i"],["/rgb\\(\\s*(",")\\s*,\\s*(",")\\s*,\\s*(",")\\s*\\)/i"]);return h=function(){return e},e}function v(){var e=z(["/(",")(deg|rad|turn)/i"]);return v=function(){return e},e}function p(){var e=z(["/\n    (repeating-)?conic-gradient(            \n    s*\n      (?:\n        (?:(",")s*,)               ","\n        |\n        (?:(",")s+(",")s*,)   ","\n        |\n        (?:(",")s*,)                 ","\n      )?\n      s*\n      (",")                          ","\n      s*\n    )\n    /i"],["/\n    (repeating-)?conic-gradient\\(            \n    \\s*\n      (?:\n        (?:(",")\\s*\\,)               ","\n        |\n        (?:(",")\\s+(",")\\s*\\,)   ","\n        |\n        (?:(",")\\s*\\,)                 ","\n      )?\n      \\s*\n      (",")                          ","\n      \\s*\n    \\)\n    /i"]);return p=function(){return e},e}function y(){var e=z(["/(?:s*","s*,)+s*","/"],["/(?:\\s*","\\s*\\,)+\\s*","/"]);return y=function(){return e},e}function m(){var e=z(["/ats+","(?:s+",")?/"],["/at\\s+","(?:\\s+",")?/"]);return m=function(){return e},e}function b(){var e=z(["/froms+","/"],["/from\\s+","/"]);return b=function(){return e},e}function k(){var e=z(["/(?:(?:","(?:s+","){0,2})|",")/"],["/(?:(?:","(?:\\s+","){0,2})|",")/"]);return k=function(){return e},e}function w(){var e=z(["/(?:","|","|","|","|","|",")/i"]);return w=function(){return e},e}function x(){var e=z(["/(?:","|",")/"]);return x=function(){return e},e}function q(){var e=z(["/(?:","|",")/"]);return q=function(){return e},e}function A(){var e=z(["/(?:lightgoldenrodyellow|mediumspringgreen|mediumaquamarine|mediumslateblue|mediumturquoise|mediumvioletred|blanchedalmond|cornflowerblue|darkolivegreen|lightslategray|lightslategrey|lightsteelblue|mediumseagreen|darkgoldenrod|darkslateblue|darkslategray|darkslategrey|darkturquoise|lavenderblush|lightseagreen|palegoldenrod|paleturquoise|palevioletred|rebeccapurple|antiquewhite|darkseagreen|lemonchiffon|lightskyblue|mediumorchid|mediumpurple|midnightblue|darkmagenta|deepskyblue|floralwhite|forestgreen|greenyellow|lightsalmon|lightyellow|navajowhite|saddlebrown|springgreen|yellowgreen|aquamarine|blueviolet|chartreuse|darkorange|darkorchid|darksalmon|darkviolet|dodgerblue|ghostwhite|lightcoral|lightgreen|mediumblue|papayawhip|powderblue|sandybrown|whitesmoke|aliceblue|burlywood|cadetblue|chocolate|darkgreen|darkkhaki|firebrick|gainsboro|goldenrod|indianred|lawngreen|lightblue|lightcyan|lightgray|lightgrey|lightpink|limegreen|mintcream|mistyrose|olivedrab|orangered|palegreen|peachpuff|rosybrown|royalblue|slateblue|slategray|slategrey|steelblue|turquoise|cornsilk|darkblue|darkcyan|darkgray|darkgrey|deeppink|honeydew|lavender|moccasin|seagreen|seashell|crimson|darkred|dimgray|dimgrey|fuchsia|hotpink|magenta|oldlace|skyblue|thistle|bisque|indigo|maroon|orange|orchid|purple|salmon|sienna|silver|tomato|violet|yellow|azure|beige|black|brown|coral|green|ivory|khaki|linen|olive|wheat|white|aqua|blue|cyan|gold|gray|grey|lime|navy|peru|pink|plum|snow|teal|red|tan)/i"]);return A=function(){return e},e}function j(){var e=z(["/#(?:","{6}|","{3})/"]);return j=function(){return e},e}function C(){var e=z(["/[0-9a-f-A-F]/"]);return C=function(){return e},e}function S(){var e=z(["/hsla(s*","s*,s*","s*,s*","s*,s*","s*)/i"],["/hsla\\(\\s*","\\s*,\\s*","\\s*,\\s*","\\s*,\\s*","\\s*\\)/i"]);return S=function(){return e},e}function F(){var e=z(["/hsl(s*","s*,s*","s*,s*","s*)/i"],["/hsl\\(\\s*","\\s*,\\s*","\\s*,\\s*","\\s*\\)/i"]);return F=function(){return e},e}function M(){var e=z(["/rgba((?:s*","s*,){3}s*","s*)/i"],["/rgba\\((?:\\s*","\\s*,){3}\\s*","\\s*\\)/i"]);return M=function(){return e},e}function P(){var e=z(["/rgb(s*","s*,s*","s*,s*","s*)/i"],["/rgb\\(\\s*","\\s*,\\s*","\\s*,\\s*","\\s*\\)/i"]);return P=function(){return e},e}function I(){var e=z(["/(?:center|left|right|top|bottom)/i"]);return I=function(){return e},e}function O(){var e=z(["/","(?:deg|rad|turn)/"]);return O=function(){return e},e}function E(){var e=z(["/","%/"]);return E=function(){return e},e}function N(){var e=z(["/","(?:",")?/"]);return N=function(){return e},e}function z(e,r){return r||(r=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(r)}}))}function L(e,r){return G(e)||B(e,r)||R()}function R(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function B(e,r){var n=[],t=!0,a=!1,o=void 0;try{for(var i,u=e[Symbol.iterator]();!(t=(i=u.next()).done)&&(n.push(i.value),!r||n.length!==r);t=!0);}catch(s){a=!0,o=s}finally{try{t||null==u.return||u.return()}finally{if(a)throw o}}return n}function G(e){if(Array.isArray(e))return e}function T(e){for(var r=[],n=arguments.length,t=new Array(n>1?n-1:0),a=1;a<n;a++)t[a-1]=arguments[a];var o=!0,i=!1,u=void 0;try{for(var s,l=e.raw.entries()[Symbol.iterator]();!(o=(s=l.next()).done);o=!0){var f=L(s.value,2),c=f[0],d=f[1];r.push(d),c<t.length&&(t[c]instanceof RegExp?r.push(t[c].source):r.push(t[c]))}}catch(p){i=!0,u=p}finally{try{o||null==l.return||l.return()}finally{if(i)throw u}}var g=L(r.join("").match(/^\/([\s\S]+)\/(\w*)$/),3),h=g[1],v=g[2];return RegExp(h.split("\n").map(function(e){return e.trim()}).join(""),v)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _=T(N(),/[+-]?\d*(?:\.\d+)?/,/[eE][+-]?\d+/),H=T(E(),_),K=T(O(),_),$=T(I()),D=T(P(),_,_,_),J=T(M(),_,_),Q=T(F(),_,H,H),U=T(S(),_,H,H,_),V=T(C()),W=T(j(),V,V),X=T(A()),Y=T(q(),K,H),Z=T(x(),H,$),ee=T(w(),D,J,W,Q,U,X),re=T(k(),ee,Y,Y),ne=T(b(),Y),te=T(m(),Z,Z),ae=T(y(),re,re),oe=T(p(),ne,"",ne,te,"",te,"",ae,"");function ie(e,r,n){return Math.max(e,Math.min(r,n))}function ue(e,r,n){var t,a,o;if(0==r)t=a=o=n;else{var i=n<.5?n*(1+r):n+r-n*r,u=2*n-i;t=se(u,i,e+1/3),a=se(u,i,e),o=se(u,i,e-1/3)}return[t,a,o]}function se(e,r,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(r-e)*n:n<.5?r:n<2/3?e+(r-e)*(2/3-n)*6:e}function le(e){return Number.parseFloat(e)}function fe(e){return Number.parseFloat(e)/100}function ce(e){var r=L(T(v(),_).exec(e),3),n=r[1],t=r[2];switch(n=le(n),t){case"deg":n/=360;break;case"rad":n/=2*Math.PI}return n}function de(e){var r=L(T(h(),_,_,_).exec(e),4),n=r[1],t=r[2],a=r[3];return[n=ie(0,1,le(n)/255),t=ie(0,1,le(t)/255),a=ie(0,1,le(a)/255),1]}function ge(e){var r=L(T(g(),_,_,_,_).exec(e),5),n=r[1],t=r[2],a=r[3],o=r[4];return[n=ie(0,1,le(n)/255),t=ie(0,1,le(t)/255),a=ie(0,1,le(a)/255),o=ie(0,1,le(o))]}function he(e){var r=L(T(d(),_,H,H).exec(e),4),n=r[1],t=r[2],a=r[3],o=L(ue(n=le(n)%360,t=ie(0,1,fe(t)),a=ie(0,1,fe(a))),3);return[o[0],o[1],o[2],1]}function ve(e){var r=L(T(c(),_,H,H,_).exec(e),5),n=r[1],t=r[2],a=r[3],o=r[4];n=le(n)%360/360,t=ie(0,1,fe(t)),a=ie(0,1,fe(a)),o=ie(0,1,le(o));var i=L(ue(n,t,a),3);return[i[0],i[1],i[2],o]}function pe(e){var r=L(T(f(),V).exec(e)||[],2)[1];if(void 0===r){var n=L(T(l(),V).exec(e),2)[1];r=n[0].repeat(2)+n[1].repeat(2)+n[2].repeat(2)}var t=Number.parseInt(r,16);return[(t>>16&255)/255,(t>>8&255)/255,(255&t)/255,1]}function ye(e){var r=L(X.exec(e),1)[0];return[].concat(o(ye.value[r.toLowerCase()]),[1])}function me(e){switch(L($.exec(e),1)[0]){case"center":return.5;case"top":case"left":return 0;case"bottom":case"right":return 1}}function be(e){return H.test(e)?fe(e):ce(e)}function ke(e){return $.test(e)?me(e):fe(e)}function we(e){var r=L(ee.exec(e),1)[0];return W.test(r)?pe(r):D.test(r)?de(r):J.test(r)?ge(r):Q.test(r)?he(r):U.test(r)?ve(r):ye(r)}function xe(e){var r,n,t,o=L(T(a(),ee,Y,Y,Y).exec(e),5),i=o[1],u=o[2],s=o[3],l=o[4];return i?(r=i,u&&(s?(n=u,t=s):t=u)):n=l,{color:r=r&&we(r),hint:n=n&&be(n),offset:t=t&&be(t)}}function qe(e){return be(L(T(t(),Y).exec(e),2)[1])}function Ae(e){var r,t,a=L(T(n(),Z,Z).exec(e),3),o=a[1],i=a[2];if(o=o&&o.toLowerCase(),!(i=i&&i.toLowerCase())){if("center"!==o)return null;i="center"}return r=o,t=i,("left"!=o&&"right"!=o||"left"!=i&&"right"!=i)&&("top"!=o&&"bottom"!=o||"top"!=i&&"bottom"!=i)?("top"!=o&&"bottom"!=o&&"left"!=i&&"right"!=i||(t=o,r=i),{x:ke(r),y:ke(t)}):null}function je(n){var t=T(r(),re),a=T(e(),re),o=[],i=L(t.exec(n),1)[0];o.push(xe(i)),a.lastIndex=t.lastIndex;for(var u=a.exec(n);u;)o.push(xe(u[0])),u=a.exec(n);return o}function Ce(e){var r=L(oe.exec(e)||[],7),n=r[0],t=r[1],a=r[2],o=r[3],i=r[4],u=r[5],s=r[6];if(!n)return null;var l=i||u,f=l?Ae(l):{x:.5,y:.5};if(!f)return null;var c=Boolean(t),d=a||o,g=d?qe(d):0,h=je(s);if(!h[0].color||!h[h.length-1].color)return null;var v=!0,p=!1,y=void 0;try{for(var m,b=h.entries()[Symbol.iterator]();!(v=(m=b.next()).done);v=!0){var k=L(m.value,2),w=k[0],x=k[1];if(0!=w&&w!=x.length-1&&(!x.color&&!h[w+1].color))return null}}catch(A){p=!0,y=A}finally{try{v||null==b.return||b.return()}finally{if(p)throw y}}var q=Fe(h);return console.log("after",q),{repeating:c,angle:g,position:f,stops:q}}function Se(e){var r=[],n=[],t=[],a=e[0],i=e[e.length-1];void 0===a.offset?t[0]=0:t[0]=a.offset,void 0===i.offset?t[e.length-1]=1:t[e.length-1]=i.offset;var u=0,s=[];function l(){var e=t[s[0].i-1],r=t[s[s.length-1].i+1]-e,n=!0,a=!1,o=void 0;try{for(var i,u=s.entries()[Symbol.iterator]();!(n=(i=u.next()).done);n=!0){var l=L(i.value,2),f=l[0],c=l[1].i;t[c]=(f+1)/(s.length+1)*r+e}}catch(d){a=!0,o=d}finally{try{n||null==u.return||u.return()}finally{if(a)throw o}}s.length=0}var f=!0,c=!1,d=void 0;try{for(var g,h=e.entries()[Symbol.iterator]();!(f=(g=h.next()).done);f=!0){var v=L(g.value,2),p=v[0],y=v[1];if(y!=a&&y!=i)if(void 0!==y.color){var m=y.offset;void 0===m?s.push({i:p,stop:y}):((m=Math.max(m,u))>u&&(u=m),t[p]=m,s.length>0&&l())}else t[p]=null}}catch(I){c=!0,d=I}finally{try{f||null==h.return||h.return()}finally{if(c)throw d}}s.length>0&&l();for(var b=[],k=0;k<t.length;){if(k==t.length-1){b.push(t[k]),r.push.apply(r,o(e[k].color));break}var w=e[k],x=e[k+1];if(x.color){var q=x.hint,A=t[k],j=t[k+1];void 0===q&&(q=j),q=Math.min(Math.max(A,q),j),n.push(A+(q-A)/2,q),r.push.apply(r,o(w.color)),b.push(A),k+=1}else{var C=e[k+2],S=t[k],F=x.hint,M=t[k+2];F<S&&(F=S);var P=C.hint;void 0===P&&(P=M),P>M&&(P=M),P<F&&(P=F,t[k+2]=F),n.push(F,P),r.push.apply(r,o(w.color)),b.push(t[k]),k+=2}}return{colors:r,hints:n,offsets:b}}function Fe(e){for(var r,n=[],t=0;t<e.length-1;){var a=e[t];0==t&&(void 0===a.offset?(a.offset=0,r=0):r=a.offset);var i=e[t+1];if(null==i.hint&&void 0===i.offset){if(t+1!=e.length-1){n.push(i),t+=1;continue}i.offset=1}var u=r;void 0!==i.hint&&(i.hint<=r?i.hint=r:r=i.hint,s(u,r)),void 0!==i.offset&&(i.offset<=r?i.offset=r:r=i.offset,s(u,r)),t+=1}function s(e,r){if(0!==n.length){var t=r-e,a=!0,o=!1,i=void 0;try{for(var u,s=n.entries()[Symbol.iterator]();!(a=(u=s.next()).done);a=!0){var l=L(u.value,2),f=l[0];l[1].offset=(f+1)/(n.length+1)*t+e}}catch(c){o=!0,i=c}finally{try{a||null==s.return||s.return()}finally{if(o)throw i}}n.length=0}}console.log(e);for(var l=[],f=[],c=[],d=0;d<e.length;){var g=e[d];if(l.push.apply(l,o(g.color)),c.push(g.offset),d==e.length-1)break;var h=e[d+1];if(h.offset)void 0===h.hint?f.push((h.offset-g.offset)/2+g.offset,h.offset):f.push((h.hint-g.offset)/2+g.offset,h.hint),d+=1;else{var v=e[d+2];void 0===v.hint?f.push(h.hint,v.offset):f.push(h.hint,v.hint),d+=2}}return{colors:l,hints:f,offsets:c}}ye.value={aliceblue:[.9411764705882353,.9725490196078431,1],antiquewhite:[.9803921568627451,.9215686274509803,.8431372549019608],aqua:[0,1,1],aquamarine:[.4980392156862745,1,.8313725490196079],azure:[.9411764705882353,1,1],beige:[.9607843137254902,.9607843137254902,.8627450980392157],bisque:[1,.8941176470588236,.7686274509803922],black:[0,0,0],blanchedalmond:[1,.9215686274509803,.803921568627451],blue:[0,0,1],blueviolet:[.5411764705882353,.16862745098039217,.8862745098039215],brown:[.6470588235294118,.16470588235294117,.16470588235294117],burlywood:[.8705882352941177,.7215686274509804,.5294117647058824],cadetblue:[.37254901960784315,.6196078431372549,.6274509803921569],chartreuse:[.4980392156862745,1,0],chocolate:[.8235294117647058,.4117647058823529,.11764705882352941],coral:[1,.4980392156862745,.3137254901960784],cornflowerblue:[.39215686274509803,.5843137254901961,.9294117647058824],cornsilk:[1,.9725490196078431,.8627450980392157],crimson:[.8627450980392157,.0784313725490196,.23529411764705882],cyan:[0,1,1],darkblue:[0,0,.5450980392156862],darkcyan:[0,.5450980392156862,.5450980392156862],darkgoldenrod:[.7215686274509804,.5254901960784314,.043137254901960784],darkgray:[.6627450980392157,.6627450980392157,.6627450980392157],darkgreen:[0,.39215686274509803,0],darkgrey:[.6627450980392157,.6627450980392157,.6627450980392157],darkkhaki:[.7411764705882353,.7176470588235294,.4196078431372549],darkmagenta:[.5450980392156862,0,.5450980392156862],darkolivegreen:[.3333333333333333,.4196078431372549,.1843137254901961],darkorange:[1,.5490196078431373,0],darkorchid:[.6,.19607843137254902,.8],darkred:[.5450980392156862,0,0],darksalmon:[.9137254901960784,.5882352941176471,.47843137254901963],darkseagreen:[.5607843137254902,.7372549019607844,.5607843137254902],darkslateblue:[.2823529411764706,.23921568627450981,.5450980392156862],darkslategray:[.1843137254901961,.30980392156862746,.30980392156862746],darkslategrey:[.1843137254901961,.30980392156862746,.30980392156862746],darkturquoise:[0,.807843137254902,.8196078431372549],darkviolet:[.5803921568627451,0,.8274509803921568],deeppink:[1,.0784313725490196,.5764705882352941],deepskyblue:[0,.7490196078431373,1],dimgray:[.4117647058823529,.4117647058823529,.4117647058823529],dimgrey:[.4117647058823529,.4117647058823529,.4117647058823529],dodgerblue:[.11764705882352941,.5647058823529412,1],firebrick:[.6980392156862745,.13333333333333333,.13333333333333333],floralwhite:[1,.9803921568627451,.9411764705882353],forestgreen:[.13333333333333333,.5450980392156862,.13333333333333333],fuchsia:[1,0,1],gainsboro:[.8627450980392157,.8627450980392157,.8627450980392157],ghostwhite:[.9725490196078431,.9725490196078431,1],gold:[1,.8431372549019608,0],goldenrod:[.8549019607843137,.6470588235294118,.12549019607843137],gray:[.5019607843137255,.5019607843137255,.5019607843137255],green:[0,.5019607843137255,0],greenyellow:[.6784313725490196,1,.1843137254901961],grey:[.5019607843137255,.5019607843137255,.5019607843137255],honeydew:[.9411764705882353,1,.9411764705882353],hotpink:[1,.4117647058823529,.7058823529411765],indianred:[.803921568627451,.3607843137254902,.3607843137254902],indigo:[.29411764705882354,0,.5098039215686274],ivory:[1,1,.9411764705882353],khaki:[.9411764705882353,.9019607843137255,.5490196078431373],lavender:[.9019607843137255,.9019607843137255,.9803921568627451],lavenderblush:[1,.9411764705882353,.9607843137254902],lawngreen:[.48627450980392156,.9882352941176471,0],lemonchiffon:[1,.9803921568627451,.803921568627451],lightblue:[.6784313725490196,.8470588235294118,.9019607843137255],lightcoral:[.9411764705882353,.5019607843137255,.5019607843137255],lightcyan:[.8784313725490196,1,1],lightgoldenrodyellow:[.9803921568627451,.9803921568627451,.8235294117647058],lightgray:[.8274509803921568,.8274509803921568,.8274509803921568],lightgreen:[.5647058823529412,.9333333333333333,.5647058823529412],lightgrey:[.8274509803921568,.8274509803921568,.8274509803921568],lightpink:[1,.7137254901960784,.7568627450980392],lightsalmon:[1,.6274509803921569,.47843137254901963],lightseagreen:[.12549019607843137,.6980392156862745,.6666666666666666],lightskyblue:[.5294117647058824,.807843137254902,.9803921568627451],lightslategray:[.4666666666666667,.5333333333333333,.6],lightslategrey:[.4666666666666667,.5333333333333333,.6],lightsteelblue:[.6901960784313725,.7686274509803922,.8705882352941177],lightyellow:[1,1,.8784313725490196],lime:[0,1,0],limegreen:[.19607843137254902,.803921568627451,.19607843137254902],linen:[.9803921568627451,.9411764705882353,.9019607843137255],magenta:[1,0,1],maroon:[.5019607843137255,0,0],mediumaquamarine:[.4,.803921568627451,.6666666666666666],mediumblue:[0,0,.803921568627451],mediumorchid:[.7294117647058823,.3333333333333333,.8274509803921568],mediumpurple:[.5764705882352941,.4392156862745098,.8588235294117647],mediumseagreen:[.23529411764705882,.7019607843137254,.44313725490196076],mediumslateblue:[.4823529411764706,.40784313725490196,.9333333333333333],mediumspringgreen:[0,.9803921568627451,.6039215686274509],mediumturquoise:[.2823529411764706,.8196078431372549,.8],mediumvioletred:[.7803921568627451,.08235294117647059,.5215686274509804],midnightblue:[.09803921568627451,.09803921568627451,.4392156862745098],mintcream:[.9607843137254902,1,.9803921568627451],mistyrose:[1,.8941176470588236,.8823529411764706],moccasin:[1,.8941176470588236,.7098039215686275],navajowhite:[1,.8705882352941177,.6784313725490196],navy:[0,0,.5019607843137255],oldlace:[.9921568627450981,.9607843137254902,.9019607843137255],olive:[.5019607843137255,.5019607843137255,0],olivedrab:[.4196078431372549,.5568627450980392,.13725490196078433],orange:[1,.6470588235294118,0],orangered:[1,.27058823529411763,0],orchid:[.8549019607843137,.4392156862745098,.8392156862745098],palegoldenrod:[.9333333333333333,.9098039215686274,.6666666666666666],palegreen:[.596078431372549,.984313725490196,.596078431372549],paleturquoise:[.6862745098039216,.9333333333333333,.9333333333333333],palevioletred:[.8588235294117647,.4392156862745098,.5764705882352941],papayawhip:[1,.9372549019607843,.8352941176470589],peachpuff:[1,.8549019607843137,.7254901960784313],peru:[.803921568627451,.5215686274509804,.24705882352941178],pink:[1,.7529411764705882,.796078431372549],plum:[.8666666666666667,.6274509803921569,.8666666666666667],powderblue:[.6901960784313725,.8784313725490196,.9019607843137255],purple:[.5019607843137255,0,.5019607843137255],rebeccapurple:[.4,.2,.6],red:[1,0,0],rosybrown:[.7372549019607844,.5607843137254902,.5607843137254902],royalblue:[.2549019607843137,.4117647058823529,.8823529411764706],saddlebrown:[.5450980392156862,.27058823529411763,.07450980392156863],salmon:[.9803921568627451,.5019607843137255,.4470588235294118],sandybrown:[.9568627450980393,.6431372549019608,.3764705882352941],seagreen:[.1803921568627451,.5450980392156862,.3411764705882353],seashell:[1,.9607843137254902,.9333333333333333],sienna:[.6274509803921569,.3215686274509804,.17647058823529413],silver:[.7529411764705882,.7529411764705882,.7529411764705882],skyblue:[.5294117647058824,.807843137254902,.9215686274509803],slateblue:[.41568627450980394,.35294117647058826,.803921568627451],slategray:[.4392156862745098,.5019607843137255,.5647058823529412],slategrey:[.4392156862745098,.5019607843137255,.5647058823529412],snow:[1,.9803921568627451,.9803921568627451],springgreen:[0,1,.4980392156862745],steelblue:[.27450980392156865,.5098039215686274,.7058823529411765],tan:[.8235294117647058,.7058823529411765,.5490196078431373],teal:[0,.5019607843137255,.5019607843137255],thistle:[.8470588235294118,.7490196078431373,.8470588235294118],tomato:[1,.38823529411764707,.2784313725490196],turquoise:[.25098039215686274,.8784313725490196,.8156862745098039],violet:[.9333333333333333,.5098039215686274,.9333333333333333],wheat:[.9607843137254902,.8705882352941177,.7019607843137254],white:[1,1,1],whitesmoke:[.9607843137254902,.9607843137254902,.9607843137254902],yellow:[1,1,0],yellowgreen:[.6039215686274509,.803921568627451,.19607843137254902]},Ce("conic-gradient(red 0turn, 0.1turn, red 0.71turn 0.6turn, 0turn, red 0.1turn, red, red, red  1turn)");var Me={parseNumber:le,parsePercentage:fe,parseAngle:ce,parseRGBFn:de,parseRGBAFn:ge,parseHexColor:pe,parseNamedColor:ye,parseAnglePercentage:be,parsePositionKeyword:me,parsePosition:ke,parseColor:we,parseAngularColorStop:xe,parseFromClause:qe,parseAtClause:Ae,parseAngularColorStopList:je,parseConicGradientFn:Ce,purify:Fe};exports.default=Me;
},{}],"HT0i":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var n=new WeakMap,o=16,t="\nattribute vec2 position; \nvoid main() {\n    gl_Position = vec4(position, 0.0, 1.0);\n}\n",e="\nprecision mediump float;\nuniform vec2 resolution;\nuniform vec4 colors[".concat(o,"];\nuniform vec2 hints[").concat(o,"];\nuniform float offsets[").concat(o,"];\nuniform float fromAngle;\nuniform vec2 atPosition;\nuniform bool repeating;\nuniform int stopCount;\nuniform float lastOffset;\nvoid main() {\n    \n    float angle = atan(resolution.y - gl_FragCoord.y - atPosition.y * resolution.y, \n        gl_FragCoord.x - atPosition.x * resolution.x);\n    \n    // Normalized\n    angle /= ").concat(2*Math.PI,"; \n\n    // 0deg should start from the North\n    angle += 0.25; \n    if (angle < 0.0) {\n        angle += 1.0;\n    }\n\n    // Bias by given 'fromAngle'\n    angle = fract(angle - fromAngle);\n\n    // TODO handle repeating case\n    if (repeating) {\n        angle = mod(angle, lastOffset);\n    }\n\n   \n    for (int i = 0; i < ").concat(o,"; i++) {\n\n        if (i == stopCount) {\n            gl_FragColor = colors[i - 1];\n            return;\n        }\n\n        if (offsets[i] >= angle) {\n\n            if (i == 0) {\n                gl_FragColor = colors[0];\n                return;\n            }\n\n            vec4 colorA = colors[i -1];\n            vec4 colorB = colors[i];\n            vec2 hintPair = hints[i - 1];\n\n            float offsetA = offsets[i - 1];\n            float H = (hintPair[0] - offsetA) / (hintPair[1] - offsetA);\n\n            if (H == 1.0) {\n                if (angle > hintPair[1]) {\n                    gl_FragColor = colorB;\n                }\n                else {\n                    gl_FragColor = colorA;\n                }\n                return;\n            }\n\n            float P = (angle - offsetA) / (hintPair[1] - offsetA);\n            float C = pow(P, log(0.5) / log(H));\n            gl_FragColor = mix(colorA, colorB, C);\n            return;\n        }\n    }\n}\n");function r(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=o.width,i=void 0===r?128:r,a=o.height,l=void 0===a?128:a,f=o.premultipledAlpha,s=void 0===f||f,g=o.antialias,c=void 0===g||g,u=document.createElement("canvas").getContext("webgl",{premultipledAlpha:s,antialias:c});u.canvas.width=i,u.canvas.height=l;var d=twgl.createProgramInfo(u,[t,e]),m=twgl.createBufferInfoFromArrays(u,{position:{numComponents:2,data:[-1,-1,-1,1,1,1,1,-1]}}),p=u.TRIANGLE_FAN;return n.set(u,{programInfo:d,bufferInfo:m,bufferInfoDrawMode:p}),u}function i(o,t){o.viewport(0,0,o.canvas.width,o.canvas.height);var e=n.get(o),r=e.programInfo,i=e.bufferInfo,a=e.bufferInfoDrawMode,l=t.stops,f=l.colors,s=l.hints,g=l.offsets,c={resolution:[o.canvas.width,o.canvas.height],fromAngle:t.angle,atPosition:[t.position.x,t.position.y],colors:f,hints:s,offsets:g,repeating:t.repeating,stopCount:g.length,lastOffset:g[g.length-1]};o.enable(o.BLEND),o.blendFunc(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA),o.useProgram(r.program),twgl.setBuffersAndAttributes(o,r,i),twgl.setUniforms(r,c),twgl.drawBufferInfo(o,i,a)}var a={render:i,createContext:r};exports.default=a;
},{}],"x+9j":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"Parser",{enumerable:!0,get:function(){return e.default}}),Object.defineProperty(exports,"Renderer",{enumerable:!0,get:function(){return r.default}});var e=t(require("./congra.parser.js")),r=t(require("./congra.renderer.js"));function t(e){return e&&e.__esModule?e:{default:e}}
},{"./congra.parser.js":"dAsd","./congra.renderer.js":"HT0i"}]},{},["x+9j"], "Congra")
// RegExp helper
// The minimal implementation supporting:
// 1. Defining RegExp across lines
// 2. Trimming head/tail whitespaces of each line
// 3. Inline comments by ${/*comment*/''}
// 4. Copying by r`/${re}/y`
//
function r(xs, ...ys) {
  const ts = [];
  for (const [i, x] of xs.raw.entries()) {
    ts.push(x);
    if (i < ys.length)
      if (ys[i] instanceof RegExp) ts.push(ys[i].source);
      else ts.push(ys[i]);
  }
  const [, src, flags] = ts.join('').match(/^\/([\s\S]+)\/(\w*)$/);
  return RegExp(src.split('\n').map(x => x.trim()).join(''), flags);
}

// Util
// Clamping
function clamp(a, b, x) {
  return Math.max(a, Math.min(b, x));
}

// Util
// HSL To RGB
// from https://stackoverflow.com/a/9493060
// 
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r, g, b];
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}



//
// tokens
// <color> ref https://www.w3.org/TR/css-color-4/#typedef-color
// 
const num_r = (() => {
  const num0_r = /[+-]?\d*(?:\.\d+)?/;    // float
  const num1_r = /[eE][+-]?\d+/;          // scientific notation Ee
  return r`/${num0_r}(?:${num1_r})?/`;    // <number>
})();
const pct_r = r`/${num_r}%/`; // <percentage>
const ang_r = r`/${num_r}(?:deg|rad|turn)/`; // <angle>
const pos_r = r`/(?:center|left|right|top|bottom)/i`; // <position-keyword>
const rgb_r = r`/rgb\(\s*${num_r}\s*,\s*${num_r}\s*,\s*${num_r}\s*\)/i`; // <rgb()>
const rgba_r = r`/rgba\((?:\s*${num_r}\s*,){3}\s*${num_r}\s*\)/i`; // <rgba()>
const hsl_r = r`/hsl\(\s*${num_r}\s*,\s*${pct_r}\s*,\s*${pct_r}\s*\)/i`; // <hsl()>
const hsla_r = r`/hsla\(\s*${num_r}\s*,\s*${pct_r}\s*,\s*${pct_r}\s*,\s*${num_r}\s*\)/i`; // <hsla()>
const hex_r = (() => {
  const hexDigit_r = r`/[0-9a-f-A-F]/`; // <hex-digit>
  return r`/#(?:${hexDigit_r}{6}|${hexDigit_r}{3})/`; //<hex-color>
})();
// <named-color>
const colorname_r = r`/(?:lightgoldenrodyellow|mediumspringgreen|mediumaquamarine|mediumslateblue|mediumturquoise|mediumvioletred|blanchedalmond|cornflowerblue|darkolivegreen|lightslategray|lightslategrey|lightsteelblue|mediumseagreen|darkgoldenrod|darkslateblue|darkslategray|darkslategrey|darkturquoise|lavenderblush|lightseagreen|palegoldenrod|paleturquoise|palevioletred|rebeccapurple|antiquewhite|darkseagreen|lemonchiffon|lightskyblue|mediumorchid|mediumpurple|midnightblue|darkmagenta|deepskyblue|floralwhite|forestgreen|greenyellow|lightsalmon|lightyellow|navajowhite|saddlebrown|springgreen|yellowgreen|aquamarine|blueviolet|chartreuse|darkorange|darkorchid|darksalmon|darkviolet|dodgerblue|ghostwhite|lightcoral|lightgreen|mediumblue|papayawhip|powderblue|sandybrown|whitesmoke|aliceblue|burlywood|cadetblue|chocolate|darkgreen|darkkhaki|firebrick|gainsboro|goldenrod|indianred|lawngreen|lightblue|lightcyan|lightgray|lightgrey|lightpink|limegreen|mintcream|mistyrose|olivedrab|orangered|palegreen|peachpuff|rosybrown|royalblue|slateblue|slategray|slategrey|steelblue|turquoise|cornsilk|darkblue|darkcyan|darkgray|darkgrey|deeppink|honeydew|lavender|moccasin|seagreen|seashell|crimson|darkred|dimgray|dimgrey|fuchsia|hotpink|magenta|oldlace|skyblue|thistle|bisque|indigo|maroon|orange|orchid|purple|salmon|sienna|silver|tomato|violet|yellow|azure|beige|black|brown|coral|green|ivory|khaki|linen|olive|wheat|white|aqua|blue|cyan|gold|gray|grey|lime|navy|peru|pink|plum|snow|teal|red|tan)/i`;

const angPct_r = r`/(?:${ang_r}|${pct_r})/`; // <angle> | <percentage>
const pctPos_r = r`/(?:${pct_r}|${pos_r})/`; // <percentage> | <position-keyword>  (corres. parser = parsePosition())
const color_r = r`/(?:${rgb_r}|${rgba_r}|${hex_r}|${hsl_r}|${hsla_r}|${colorname_r})/i`; // <color>
const stop_r = r`/(?:(?:${color_r}(?:\s+${angPct_r}){0,2})|${angPct_r})/`; // <angular-color-stop>

const from_r = r`/from\s+${angPct_r}/`; // from clause
const at_r = r`/at\s+${pctPos_r}(?:\s+${pctPos_r})?/`; // at clause
const list_r = r`/(?:\s*${stop_r}\s*\,)+\s*${stop_r}/`; // color stop list

// Chopping into 4 logical parts: repeating/from/at/list
// - [1] repeating-
// - [2] from clause
// - [3] from clause
// - [4] at clause
// - [5] at clause
// - [6] color stop list 
//
const conic_r = r`/
^\s*(repeating-)?conic-gradient\(            
  \s*
  (?:
    (?:(${from_r})\s*\,)               ${/* "from" only */''}
    |
    (?:(${from_r})\s+(${at_r})\s*\,)   ${/* "from" coexists with "at" */''}
    |
    (?:(${at_r})\s*\,)                 ${/* "at" only */''}
  )?
  \s*
  (${list_r})                          ${/* color-stop-list */''}
  \s*
\)\s*$
/i`; // Ignorecase



//
// Parsers
//

// <number> parser
// returns js number
function parseNumber(str) {
  return Number.parseFloat(str);
}

// <percentage> parser
// returns normalized %
function parsePercentage(str) {
  return Number.parseFloat(str) / 100;
}

// <angle> parser
// return normalized angle
function parseAngle(str) {
  let [, num, unit] = r`/(${num_r})(deg|rad|turn)/i`.exec(str);
  num = parseNumber(num);
  switch (unit) {
    case 'deg': num /= 360; break;
    case 'rad': num /= Math.PI * 2; break;
  }
  return num;
}

// <rgb()> parser
// returns [R,G,B,1.0] where RGB are normalized
function parseRGBFn(str) {
  let [, R, G, B] = r`/rgb\(\s*(${num_r})\s*,\s*(${num_r})\s*,\s*(${num_r})\s*\)/i`.exec(str);
  R = clamp(0, 1, parseNumber(R) / 255);
  G = clamp(0, 1, parseNumber(G) / 255);
  B = clamp(0, 1, parseNumber(B) / 255);
  return [R, G, B, 1.0];
}

// <rgba()> parser
// returns [R,G,B,A] where RGBA are normalized
function parseRGBAFn(str) {
  let [, R, G, B, A] = r`/rgba\(\s*(${num_r})\s*,\s*(${num_r})\s*,\s*(${num_r})\s*,\s*(${num_r})\s*\)/i`.exec(str);
  R = clamp(0, 1, parseNumber(R) / 255);
  G = clamp(0, 1, parseNumber(G) / 255);
  B = clamp(0, 1, parseNumber(B) / 255);
  A = clamp(0, 1, parseNumber(A));
  return [R, G, B, A];
}

// <hsl()> parser
// returns [R,G,B,1] where RGB are normalized
function parseHSLFn(str) {
  let [, H, S, L] = r`/hsl\(\s*(${num_r})\s*,\s*(${pct_r})\s*,\s*(${pct_r})\s*\)/`.exec(str);
  H = parseNumber(H) % 360;
  S = clamp(0, 1, parsePercentage(S));
  L = clamp(0, 1, parsePercentage(L));
  const [R, G, B] = hslToRgb(H, S, L);
  return [R, G, B, 1.0];
}

// <hsla()> parser 
// returns [R,G,B,A] where RGBA are normalized
function parseHSLAFn(str) {
  let [, H, S, L, A] = r`/hsla\(\s*(${num_r})\s*,\s*(${pct_r})\s*,\s*(${pct_r})\s*,\s*(${num_r})\s*\)/`.exec(str);
  H = (parseNumber(H) % 360) / 360;
  S = clamp(0, 1, parsePercentage(S));
  L = clamp(0, 1, parsePercentage(L));
  A = clamp(0, 1, parseNumber(A));
  const [R, G, B] = hslToRgb(H, S, L);
  return [R, G, B, A];
}

// <hex-color> parser
// returns [R,G,B,1] where RGBA are normalized
function parseHexColor(str) {
  let [, hex6] = r`/#([0-9a-f]{6})/i`.exec(str) || [];

  if (hex6 === undefined) {
    let [, hex3] = r`/#($[0-9a-f]{3})/i`.exec(str);
    hex6 = hex3[0].repeat(2) + hex3[1].repeat(2) + hex3[2].repeat(2);
  }

  const num = Number.parseInt(hex6, 16);
  const R = ((num >> 16) & 0xff) / 255;
  const G = ((num >> 8) & 0xff) / 255;
  const B = (num & 0xff) / 255;
  return [R, G, B, 1.0];
}

// <named-color> parser
// returns [R,G,B,1] where RGBA are normalized
function parseNamedColor(str) {
  let [name] = colorname_r.exec(str); // re-use existing one.
  return [...parseNamedColor.value[name.toLowerCase()], 1.0];
}
parseNamedColor.value = { "aliceblue": [0.9411764705882353, 0.9725490196078431, 1], "antiquewhite": [0.9803921568627451, 0.9215686274509803, 0.8431372549019608], "aqua": [0, 1, 1], "aquamarine": [0.4980392156862745, 1, 0.8313725490196079], "azure": [0.9411764705882353, 1, 1], "beige": [0.9607843137254902, 0.9607843137254902, 0.8627450980392157], "bisque": [1, 0.8941176470588236, 0.7686274509803922], "black": [0, 0, 0], "blanchedalmond": [1, 0.9215686274509803, 0.803921568627451], "blue": [0, 0, 1], "blueviolet": [0.5411764705882353, 0.16862745098039217, 0.8862745098039215], "brown": [0.6470588235294118, 0.16470588235294117, 0.16470588235294117], "burlywood": [0.8705882352941177, 0.7215686274509804, 0.5294117647058824], "cadetblue": [0.37254901960784315, 0.6196078431372549, 0.6274509803921569], "chartreuse": [0.4980392156862745, 1, 0], "chocolate": [0.8235294117647058, 0.4117647058823529, 0.11764705882352941], "coral": [1, 0.4980392156862745, 0.3137254901960784], "cornflowerblue": [0.39215686274509803, 0.5843137254901961, 0.9294117647058824], "cornsilk": [1, 0.9725490196078431, 0.8627450980392157], "crimson": [0.8627450980392157, 0.0784313725490196, 0.23529411764705882], "cyan": [0, 1, 1], "darkblue": [0, 0, 0.5450980392156862], "darkcyan": [0, 0.5450980392156862, 0.5450980392156862], "darkgoldenrod": [0.7215686274509804, 0.5254901960784314, 0.043137254901960784], "darkgray": [0.6627450980392157, 0.6627450980392157, 0.6627450980392157], "darkgreen": [0, 0.39215686274509803, 0], "darkgrey": [0.6627450980392157, 0.6627450980392157, 0.6627450980392157], "darkkhaki": [0.7411764705882353, 0.7176470588235294, 0.4196078431372549], "darkmagenta": [0.5450980392156862, 0, 0.5450980392156862], "darkolivegreen": [0.3333333333333333, 0.4196078431372549, 0.1843137254901961], "darkorange": [1, 0.5490196078431373, 0], "darkorchid": [0.6, 0.19607843137254902, 0.8], "darkred": [0.5450980392156862, 0, 0], "darksalmon": [0.9137254901960784, 0.5882352941176471, 0.47843137254901963], "darkseagreen": [0.5607843137254902, 0.7372549019607844, 0.5607843137254902], "darkslateblue": [0.2823529411764706, 0.23921568627450981, 0.5450980392156862], "darkslategray": [0.1843137254901961, 0.30980392156862746, 0.30980392156862746], "darkslategrey": [0.1843137254901961, 0.30980392156862746, 0.30980392156862746], "darkturquoise": [0, 0.807843137254902, 0.8196078431372549], "darkviolet": [0.5803921568627451, 0, 0.8274509803921568], "deeppink": [1, 0.0784313725490196, 0.5764705882352941], "deepskyblue": [0, 0.7490196078431373, 1], "dimgray": [0.4117647058823529, 0.4117647058823529, 0.4117647058823529], "dimgrey": [0.4117647058823529, 0.4117647058823529, 0.4117647058823529], "dodgerblue": [0.11764705882352941, 0.5647058823529412, 1], "firebrick": [0.6980392156862745, 0.13333333333333333, 0.13333333333333333], "floralwhite": [1, 0.9803921568627451, 0.9411764705882353], "forestgreen": [0.13333333333333333, 0.5450980392156862, 0.13333333333333333], "fuchsia": [1, 0, 1], "gainsboro": [0.8627450980392157, 0.8627450980392157, 0.8627450980392157], "ghostwhite": [0.9725490196078431, 0.9725490196078431, 1], "gold": [1, 0.8431372549019608, 0], "goldenrod": [0.8549019607843137, 0.6470588235294118, 0.12549019607843137], "gray": [0.5019607843137255, 0.5019607843137255, 0.5019607843137255], "green": [0, 0.5019607843137255, 0], "greenyellow": [0.6784313725490196, 1, 0.1843137254901961], "grey": [0.5019607843137255, 0.5019607843137255, 0.5019607843137255], "honeydew": [0.9411764705882353, 1, 0.9411764705882353], "hotpink": [1, 0.4117647058823529, 0.7058823529411765], "indianred": [0.803921568627451, 0.3607843137254902, 0.3607843137254902], "indigo": [0.29411764705882354, 0, 0.5098039215686274], "ivory": [1, 1, 0.9411764705882353], "khaki": [0.9411764705882353, 0.9019607843137255, 0.5490196078431373], "lavender": [0.9019607843137255, 0.9019607843137255, 0.9803921568627451], "lavenderblush": [1, 0.9411764705882353, 0.9607843137254902], "lawngreen": [0.48627450980392156, 0.9882352941176471, 0], "lemonchiffon": [1, 0.9803921568627451, 0.803921568627451], "lightblue": [0.6784313725490196, 0.8470588235294118, 0.9019607843137255], "lightcoral": [0.9411764705882353, 0.5019607843137255, 0.5019607843137255], "lightcyan": [0.8784313725490196, 1, 1], "lightgoldenrodyellow": [0.9803921568627451, 0.9803921568627451, 0.8235294117647058], "lightgray": [0.8274509803921568, 0.8274509803921568, 0.8274509803921568], "lightgreen": [0.5647058823529412, 0.9333333333333333, 0.5647058823529412], "lightgrey": [0.8274509803921568, 0.8274509803921568, 0.8274509803921568], "lightpink": [1, 0.7137254901960784, 0.7568627450980392], "lightsalmon": [1, 0.6274509803921569, 0.47843137254901963], "lightseagreen": [0.12549019607843137, 0.6980392156862745, 0.6666666666666666], "lightskyblue": [0.5294117647058824, 0.807843137254902, 0.9803921568627451], "lightslategray": [0.4666666666666667, 0.5333333333333333, 0.6], "lightslategrey": [0.4666666666666667, 0.5333333333333333, 0.6], "lightsteelblue": [0.6901960784313725, 0.7686274509803922, 0.8705882352941177], "lightyellow": [1, 1, 0.8784313725490196], "lime": [0, 1, 0], "limegreen": [0.19607843137254902, 0.803921568627451, 0.19607843137254902], "linen": [0.9803921568627451, 0.9411764705882353, 0.9019607843137255], "magenta": [1, 0, 1], "maroon": [0.5019607843137255, 0, 0], "mediumaquamarine": [0.4, 0.803921568627451, 0.6666666666666666], "mediumblue": [0, 0, 0.803921568627451], "mediumorchid": [0.7294117647058823, 0.3333333333333333, 0.8274509803921568], "mediumpurple": [0.5764705882352941, 0.4392156862745098, 0.8588235294117647], "mediumseagreen": [0.23529411764705882, 0.7019607843137254, 0.44313725490196076], "mediumslateblue": [0.4823529411764706, 0.40784313725490196, 0.9333333333333333], "mediumspringgreen": [0, 0.9803921568627451, 0.6039215686274509], "mediumturquoise": [0.2823529411764706, 0.8196078431372549, 0.8], "mediumvioletred": [0.7803921568627451, 0.08235294117647059, 0.5215686274509804], "midnightblue": [0.09803921568627451, 0.09803921568627451, 0.4392156862745098], "mintcream": [0.9607843137254902, 1, 0.9803921568627451], "mistyrose": [1, 0.8941176470588236, 0.8823529411764706], "moccasin": [1, 0.8941176470588236, 0.7098039215686275], "navajowhite": [1, 0.8705882352941177, 0.6784313725490196], "navy": [0, 0, 0.5019607843137255], "oldlace": [0.9921568627450981, 0.9607843137254902, 0.9019607843137255], "olive": [0.5019607843137255, 0.5019607843137255, 0], "olivedrab": [0.4196078431372549, 0.5568627450980392, 0.13725490196078433], "orange": [1, 0.6470588235294118, 0], "orangered": [1, 0.27058823529411763, 0], "orchid": [0.8549019607843137, 0.4392156862745098, 0.8392156862745098], "palegoldenrod": [0.9333333333333333, 0.9098039215686274, 0.6666666666666666], "palegreen": [0.596078431372549, 0.984313725490196, 0.596078431372549], "paleturquoise": [0.6862745098039216, 0.9333333333333333, 0.9333333333333333], "palevioletred": [0.8588235294117647, 0.4392156862745098, 0.5764705882352941], "papayawhip": [1, 0.9372549019607843, 0.8352941176470589], "peachpuff": [1, 0.8549019607843137, 0.7254901960784313], "peru": [0.803921568627451, 0.5215686274509804, 0.24705882352941178], "pink": [1, 0.7529411764705882, 0.796078431372549], "plum": [0.8666666666666667, 0.6274509803921569, 0.8666666666666667], "powderblue": [0.6901960784313725, 0.8784313725490196, 0.9019607843137255], "purple": [0.5019607843137255, 0, 0.5019607843137255], "rebeccapurple": [0.4, 0.2, 0.6], "red": [1, 0, 0], "rosybrown": [0.7372549019607844, 0.5607843137254902, 0.5607843137254902], "royalblue": [0.2549019607843137, 0.4117647058823529, 0.8823529411764706], "saddlebrown": [0.5450980392156862, 0.27058823529411763, 0.07450980392156863], "salmon": [0.9803921568627451, 0.5019607843137255, 0.4470588235294118], "sandybrown": [0.9568627450980393, 0.6431372549019608, 0.3764705882352941], "seagreen": [0.1803921568627451, 0.5450980392156862, 0.3411764705882353], "seashell": [1, 0.9607843137254902, 0.9333333333333333], "sienna": [0.6274509803921569, 0.3215686274509804, 0.17647058823529413], "silver": [0.7529411764705882, 0.7529411764705882, 0.7529411764705882], "skyblue": [0.5294117647058824, 0.807843137254902, 0.9215686274509803], "slateblue": [0.41568627450980394, 0.35294117647058826, 0.803921568627451], "slategray": [0.4392156862745098, 0.5019607843137255, 0.5647058823529412], "slategrey": [0.4392156862745098, 0.5019607843137255, 0.5647058823529412], "snow": [1, 0.9803921568627451, 0.9803921568627451], "springgreen": [0, 1, 0.4980392156862745], "steelblue": [0.27450980392156865, 0.5098039215686274, 0.7058823529411765], "tan": [0.8235294117647058, 0.7058823529411765, 0.5490196078431373], "teal": [0, 0.5019607843137255, 0.5019607843137255], "thistle": [0.8470588235294118, 0.7490196078431373, 0.8470588235294118], "tomato": [1, 0.38823529411764707, 0.2784313725490196], "turquoise": [0.25098039215686274, 0.8784313725490196, 0.8156862745098039], "violet": [0.9333333333333333, 0.5098039215686274, 0.9333333333333333], "wheat": [0.9607843137254902, 0.8705882352941177, 0.7019607843137254], "white": [1, 1, 1], "whitesmoke": [0.9607843137254902, 0.9607843137254902, 0.9607843137254902], "yellow": [1, 1, 0], "yellowgreen": [0.6039215686274509, 0.803921568627451, 0.19607843137254902] };

// <position-keyword> parser
// returns 0.0|0.5|1.0
function parsePositionKeyword(str) {
  let [keyword] = pos_r.exec(str);
  switch (keyword) {
    case 'center': return 0.5;
    case 'top': case 'left': return 0.0;
    case 'bottom': case 'right': return 1.0;
  }
}

// <angle-percentage> parser
function parseAnglePercentage(str) {
  return pct_r.test(str) ? parsePercentage(str) : parseAngle(str);
}

// <position> parser 
function parsePosition(str) {
  return pos_r.test(str) ? parsePositionKeyword(str) : parsePercentage(str);
}

// <color> parser
function parseColor(str) {
  const [s] = color_r.exec(str);
  if (hex_r.test(s)) return parseHexColor(s);
  if (rgb_r.test(s)) return parseRGBFn(s);
  if (rgba_r.test(s)) return parseRGBAFn(s);
  if (hsl_r.test(s)) return parseHSLFn(s);
  if (hsla_r.test(s)) return parseHSLAFn(s);
  return parseNamedColor(s);
}

// <angular-color-stop> parser
// returns { color[4], hint, offset }, all values are normalized
function parseAngularColorStop(str) {
  const [, c, a0, a1, h] = r`/(?:(${color_r})(\s+${angPct_r})?(\s+${angPct_r})?)|(${angPct_r})/`.exec(str);
  let color, hint, offset;
  if (c) {
    color = c;
    if (a0) { // maybe a hint
      if (a1) {
        hint = a0;
        offset = a1;
      }
      else {
        offset = a0;
      }
    }
  }
  else { // lone hint
    hint = h;
  }

  color = color && parseColor(color);
  hint = hint && parseAnglePercentage(hint);
  offset = offset && parseAnglePercentage(offset);

  return { color, hint, offset };
}



// "from clause" parser
// returns float - normalized angle, e.g. 0.125 for "from 45deg"
//                 may outside 0..1, e.g. -0.125 for "from -45deg"
function parseFromClause(str) {
  const [, s] = r`/from\s+(${angPct_r})/i`.exec(str);
  return parseAnglePercentage(s);
}



// "at clause" parser
// Returns float[2] - normalized position x y 
//                    null, if position keyword conflicts
function parseAtClause(str) {
  let [, a, b] = r`/at\s+(${pctPos_r})(?:\s+(${pctPos_r}))?/i`.exec(str);
  a = a && a.toLowerCase();
  b = b && b.toLowerCase();
  let px, py;

  if (!b) { // 1-value
    if (a === "center") {
      b = "center"
    }
    else {
      return null;
    }
  }

  px = a;
  py = b;

  // keyword conflicts
  if (
    ((a == "left" || a == "right") && (b == "left" || b == "right")) ||
    ((a == "top" || a == "bottom") && (b == "top" || b == "bottom"))
  ) return null;

  // corrects the order
  if (a == "top" || a == "bottom" || b == "left" || b == "right") {
    py = a;
    px = b;
  }

  const x = parsePosition(px);
  const y = parsePosition(py);

  return { x, y };
}



// "angular-color-stop-list" parser
// Returns <angular-color-stop>[]
function parseAngularColorStopList(str) {
  const first_r = r`/${stop_r}/yi`;
  const rest_r = r`/\s*,\s*(${stop_r})/yi`;
  const stops = [];

  const [s0] = first_r.exec(str);
  stops.push(parseAngularColorStop(s0));

  rest_r.lastIndex = first_r.lastIndex;
  let m = rest_r.exec(str);
  while (m) {
    stops.push(parseAngularColorStop(m[0]));
    m = rest_r.exec(str);
  }
  return stops;
}



// <conic-gradient()> parser
// returns { repeating, angle, position{}, stops[] }
//         null, if bad syntax detects

function parseConicGradientFn(str) {
  const [all, rp, fr0, fr1, at1, at2, ls] = conic_r.exec(str) || [];

  if (!all) return null;

  // position{}
  // - if omit, defaults to x=0.5, y=0.5
  // - if keyword conflicts, then `null`
  const at = at1 || at2;
  const position = at ? parseAtClause(at) : { x: 0.5, y: 0.5 };
  if (!position) return null;

  // repeating 
  const repeating = Boolean(rp);

  // angle 
  const fr = fr0 || fr1;
  const angle = fr ? parseFromClause(fr) : 0.0;

  // stops[]
  // - if a lone color-hint is at head/tail of list, then `null` .. bad syntax
  // - if there are two lone color-hints in a row, then `null`.. bad syntax
  // - https://drafts.csswg.org/css-images-4/#conic-color-stops
  const dirtyStops = parseAngularColorStopList(ls);
  if (!dirtyStops[0].color || !dirtyStops[dirtyStops.length - 1].color) return null;
  for (const [i, dirtyStop] of dirtyStops.entries()) {
    if (i == 0 || i == dirtyStop.length - 1) continue;
    if (!dirtyStop.color && !dirtyStops[i + 1].color) return null;
  }

  // Purify color-stop list for congra renderer
  const stops = purify(dirtyStops);

  return { repeating, angle, position, stops };
}



//
// Color-hint 
//   It is an absolute position along gradient line, *NOT* relative position between two color-stops.
// Color-offset (or color-position)
//   It is an absolute position along gradient line, it must be >= its color-hint.
// 
// Consider, "red 0.1turn, 0.3turn, blue 0.68turn 1.0turn"
//   let stopA be red 0.1turn
//   let stopB be blue 0.68turn 1.0turn
//   let loneHint be 0.3turn
//   +----------------
//   |
//   |   stopAOffset    loneHint                    stopBHint          stopBOffset
//   |   0.1            0.3                         0.68                1.0
//   |    |------------->|-------------------------->|<---------------->|
//   |    |              ^--< halfway point          |<- stopBColor   ->|
//   |    |<---- interpolation happens only here --->|<- notransition ->|
//   |
//   +---------------
//   
//   Fshader requires a `vec2 hints[]` storing hint pairs, for above case,
//   hints[0] is [0.3, 0.68].
//
// purify(stopList)
// 1. Dictating color-hints and color-offsets from first color-stop to last color-stop
//    This mutates color-stop's `hint` and/or `offset` prop.
// 2. Computing hint pair of each color-stop, except the last one.
// 3. Returning an object containing colors[], hints[], offsets[].
//
function purify(stops) {
  let unknowns = [];
  let min;
  let i = 0;
  while (i < stops.length - 1) {

    let stop = stops[i];

    if (i == 0) {
      if (stop.offset === undefined) {
        stop.offset = 0.0;
        min = 0.0;
      }
      else {
        min = stop.offset;
      }
    }

    let next = stops[i + 1];

    if (next.hint == undefined && next.offset === undefined) { // lonehint never add to unknowns[]
      if (i + 1 == stops.length - 1) {
        next.offset = 1.0;
      }
      else {
        unknowns.push(next);
        i += 1;
        continue;
      }
    }

    const oMin = min;

    if (next.hint !== undefined) { // has hint
      if (next.hint <= min) {
        next.hint = min; // tuned
      }
      else {
        min = next.hint;
      }
      resolveUnknowns(oMin, min);
    }

    if (next.offset !== undefined) { // has offset
      if (next.offset <= min) {
        next.offset = min; // tuned
      }
      else {
        min = next.offset;
      }
      resolveUnknowns(oMin, min);
    }

    i += 1;
  }

  function resolveUnknowns(a, b) {
    if (unknowns.length === 0) return;
    const range = b - a;
    for (const [i, unknown] of unknowns.entries()) { // 0, (.33), (.66),  1
      unknown.offset = (i + 1) / (unknowns.length + 1) * range + a;
    }
    unknowns.length = 0; // clear
  }

  // Compute hint pair

  let colors = [];  //1d vec4
  let hints = [];   //1d vec2
  let offsets = []; //1d float

  for (let i = 0; i < stops.length;) {

    const stop = stops[i];

    colors.push(...stop.color);
    offsets.push(stop.offset);

    if (i == stops.length - 1) {
      break;
    }

    const next = stops[i + 1];

    if (next.offset) { // next stop is not a lone hint stop
      // ex
      // { color: [0,0,0,0], hint: undefined, offset:0.3 } 
      // { color: [1,1,1,1], hint: undefined, offset:0.5 }

      if (next.hint === undefined) {
        hints.push((next.offset - stop.offset) / 2 + stop.offset, next.offset);
      }
      else {
        hints.push((next.hint - stop.offset) / 2 + stop.offset, next.hint);
      }

      i += 1;
    }
    else { // next stop is a lone hint
      //ex
      // {color:[0,0,0,0], hint:undefined, offset:0.3}
      // {color:undefined, hint:0.4, offset:undefined} <-lone hint
      // {color:[1,1,1,1], hint:undefined, offset:0.5}

      const next2 = stops[i + 2];

      if (next2.hint === undefined) {
        hints.push(next.hint, next2.offset);
      }
      else {
        hints.push(next.hint, next2.hint);
      }

      i += 2;
    }
  }

  return { colors, hints, offsets };
}



//
// Expose
//
export default {
  parseNumber,
  parsePercentage,
  parseAngle,
  parseRGBFn,
  parseRGBAFn,
  parseHexColor,
  parseNamedColor,
  parseAnglePercentage,
  parsePositionKeyword,
  parsePosition,
  parseColor,
  parseAngularColorStop,
  parseFromClause,
  parseAtClause,
  parseAngularColorStopList,
  parseConicGradientFn,
  purify
};

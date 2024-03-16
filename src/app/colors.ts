
export function xyToRgb(x, y)
{
    if (x == 0) {
      x = 0.001;
    }
    if (y == 0) {
      y = 0.001;
    }
    let z = 1.0 - x - y;

    let Y = 255; // brightness
    let X = (Y / y) * x;
    let Z = (Y / y) * z;
    let r = X * 1.612 - Y * 0.203 - Z * 0.302;
    let g = -X * 0.509 + Y * 1.412 + Z * 0.066;
    let b = X * 0.026 - Y * 0.072 + Z * 0.962;
    r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
    g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
    b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
    let maxValue = Math.max(r,g,b);
    r /= maxValue;
    g /= maxValue;
    b /= maxValue;
    r = r * 255;//   if (r < 0) { r = 255 };
    g = g * 255;//   if (g < 0) { g = 255 };
    b = b * 255;//   if (b < 0) { b = 255 };
    if (r > 0) {} else { r = 0 };
    if (g > 0) {} else { g = 0 };
    if (b > 0) {} else { b = 0 };

    return rgbToHex(Math.round(r),Math.round(g),Math.round(b));
}

export function rgbToHex(r, g, b) {
  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function hsvToRgb(h, s) {
    h = h / 65535;
    s = s / 254;
    let v = 1;
    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));

}


export function hexToHs (hex) {

    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;


    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs),
    diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 65535),
        s: Math.round(s * 254)
//        v: Math.round(v * 254)
    };
}

export function kelvinToCt(kelvin) {
  let minPicked = 2194.0536499023438;
  let maxPicked = 10991.905212402344;

  let pickedValue = kelvin - minPicked;
  maxPicked = maxPicked - minPicked;

  pickedValue = 1 - (pickedValue / maxPicked);

  let ctMin = 153;
  let ctMax = 500;

  pickedValue = Math.round(((ctMax-ctMin) * pickedValue) + ctMin);
  return pickedValue;
}

export function ctToPickerKelvin(ct) {
  let ctMin = 153;
  let ctMax = 500;
  let minPicked = 2194.0536499023438;
  let maxPicked = 10991.905212402344;
  let value = 1 - ((ct - ctMin) / (ctMax - ctMin));
  value = (value * (maxPicked - minPicked)) + minPicked;
  return value;
}

export function kelvinToRgb(kelvin) {
 // source: https://gist.github.com/paulkaplan/5184275
    var temp = kelvin / 100;
    var red, green, blue;
    if( temp <= 66 ){
        red = 255;
        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;
        if( temp <= 19){
            blue = 0;
        } else {
            blue = temp-10;
            blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
        }
    } else {
        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);
        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492 );
        blue = 255;
    }
    red = Math.round(red); green = Math.round(green); blue = Math.round(blue);
    return {
        r : red,
        g : green,
        b : blue
    }
}

export function ctToHex(ct) {
  let ctMin = 153;
  let ctMax = 500;

  let kelvinMin = 6500;
  let kelvinMax = 2000;

  let value = (ct - ctMin) / (ctMax - ctMin);
  value = Math.round((value * (kelvinMax-kelvinMin)) + kelvinMin);

  console.log(value);

  console.log(kelvinToRgb(value).r);

  console.log(kelvinToRgb(value).g);
  console.log(kelvinToRgb(value).b);

  let rgb = kelvinToRgb(value);

  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

export function lightOrDark(color) {

  if (color === undefined) {
    return 'light';
  }

  color = +("0x" + color.replace(
  color.length < 5 && /./g, '$&$&'));

  let r = color >> 16;
  let g = color >> 8 & 255;
  let b = color & 255;

  let hsp = Math.sqrt(
  0.299 * (r * r) +
  0.587 * (g * g) +
  0.114 * (b * b)
  );

  if (hsp>150) {
    return 'light';
  }
  else {
    return 'dark';
  }
}


export class Color {
  static color2rgb(color) {
    if (color[0] == "#") {
      if (color.length == 7) {
        return [
          parseInt(color.substring(1, 3), 16),
          parseInt(color.substring(3, 5), 16),
          parseInt(color.substring(5, 7), 16),
        ];
      } else if (color.length == 4) {
        return [
          parseInt(color[1], 16) * 16,
          parseInt(color[2], 16) * 16,
          parseInt(color[3], 16) * 16,
        ];
      }
    }
    throw new Error("is not css color: " + color);
  }
  static rgb2color(rgb) {
    return "#" + rgb.map(n => n < 16 ? "0" + n.toString(16) : n > 255 ? "ff" : n.toString(16)).join("");
  }
  static rgb2hsv(rgb) {
    const [rr, gg, bb] = rgb;
    const hsv = [0, 0, 0];
    const r = rr / 255;
    const g = gg / 255;
    const b = bb / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max != 0) {
      hsv[1] = (max - min) / max;
      if (max - min == 0) {
      } else if (max == r) {
        hsv[0] = 60 * (g - b) / (max - min);
      } else if (max == g) {
        hsv[0] = 60 * (b - r) / (max - min) + 120;
      } else {
        hsv[0] = 60 * (r - g) / (max - min) + 240;
      }
      if (hsv[0] < 0) {
        hsv[0] += 360;
      }
    }
    hsv[2] = max;
    return hsv;
  }
  static hsv2rgb(hsv) {
    let [h, s, v] = hsv;
    while (h < 0) {
      h += 360;
    }
    h %= 360;
    if (s == 0) {
      v = v * 255 >> 0;
      return [v, v, v];
    }
    const hi = h / 60 >> 0;
    const f = h / 60 - hi;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let rgb = null;
    if (hi == 0) {
      rgb = [v, t, p];
    } else if (hi == 1) {
      rgb = [q, v, p];
    } else if (hi == 2) {
      rgb = [p, v, t];
    } else if (hi == 3) {
      rgb = [p, q, v];
    } else if (hi == 4) {
      rgb = [t, p, v];
    } else if (hi == 5) {
      rgb = [v, p, q];
    } else {
      rgb = [1, 1, 1];
    }
    rgb[0] = rgb[0] * 255 >> 0;
    rgb[1] = rgb[1] * 255 >> 0;
    rgb[2] = rgb[2] * 255 >> 0;
    return rgb;
  }
  static lighter(color, ratio) {
    const rgb = Color.color2rgb(color);
    const hsv = Color.rgb2hsv(rgb);
    hsv[2] *= ratio;
    const rgb2 = Color.hsv2rgb(hsv);
    const c = Color.rgb2color(rgb2)
    return c;
  }
}

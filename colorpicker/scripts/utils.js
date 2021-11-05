Array.prototype.formatArray = function(decimals = 2) {
    return this.map(x => parseFloat(x.toFixed(decimals))).join(', ');
}

String.prototype.trimAndSplit = function(seperator = ',') {
    return this.trim().split(seperator).map(x => parseInt(x));
}

// Random color generator
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Convert rgb to vec3
function rgb2vec3(rgb) {
    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];
}

// Convert rgb to hex
function rgb2hex(rgb) {
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

// Convert rgb to hsv
function rgb2hsv(rgb) {
    let r = rgb[0], g = rgb[1], b = rgb[2];
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;

    let d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) 
        h = 0; // Achromatic

    else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, v];
}

// Convert vec3 to rgb
function vec3toRGB(vec3) {
    return [Math.round(vec3[0] * 255), Math.round(vec3[1] * 255), Math.round(vec3[2] * 255)];
}

// Convert vec3 to hex
function vec3toHex(vec3) {
    return rgb2hex(vec3toRGB(vec3));
}

// Convert vec3 to hsv
function vec3toHSV(vec3) {
    return rgb2hsv(vec3toRGB(vec3));
}

// Convert hex to rgb
function hex2rgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

// Convert hex to vec3
function hex2vec3(hex) {
    return rgb2vec3(hex2rgb(hex));
}

// Convert hex to hsv
function hex2hsv(hex) {
    return rgb2hsv(hex2rgb(hex));
}

// Convert hsv to rgb
function hsv2rgb(hsv) {
    let h = hsv[0], s = hsv[1], v = hsv[2];
    let r, g, b;

    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r, g, b];
}

// Convert hsv to vec3
function hsv2vec3(hsv) {
    return rgb2vec3(hsv2rgb(hsv));
}

// Convert hsv to hex
function hsv2hex(hsv) {
    return rgb2hex(hsv2rgb(hsv));
}
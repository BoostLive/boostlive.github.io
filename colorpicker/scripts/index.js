const container = document.getElementsByClassName('container')[0];
const randomColor = getRandomColor();

/* Inputs */
const rgbInput = document.getElementById('rgb-input');
const hexInput = document.getElementById('hex-input');
const hsvInput = document.getElementById('hsv-input');
const vec3Input = document.getElementById('vec3-input');
const colorInput = document.getElementById('color-input');

updateInputs(randomColor)

/* Update inputs & color when changed */
rgbInput.addEventListener('change', (e) => updateInputs(rgb2hex(e.target.value.trimAndSplit())));
hexInput.addEventListener('change', (e) => updateInputs(e.target.value));
hsvInput.addEventListener('change', (e) => updateInputs(hsv2hex(e.target.value.trimAndSplit())));
vec3Input.addEventListener('change', (e) => updateInputs(vec3toHex(e.target.value.trimAndSplit())));
colorInput.addEventListener('change', (e) => updateInputs(e.target.value));

/** @param {string} color - Hex */
function updateInputs(color)
{
  rgbInput.value = hex2rgb(color).formatArray();
  hexInput.value = color;
  hsvInput.value = hex2hsv(color).formatArray(3);
  vec3Input.value = hex2vec3(color).formatArray(2);
  colorInput.value = color;

  // Update container border-color and shadow color
  container.style.borderColor = color;
  container.style.boxShadow = `0px 0px 200px ${color}`;
}
console.log("Hello World");

// Simple example, see optional options for more configuration.
const pickr = Pickr.create
({
	// Selector or element which will be replaced with the actual color-picker. Can be a HTMLElement.
	el: '.color-picker',

	// Which theme you want to use. Can be 'classic', 'monolith' or 'nano'
	theme: 'monolith',

	// Don't replace 'el' Element with the pickr-button, instead use 'el' as a button.
	// If true, appendToBody will also be automatically true.
	useAsButton: true,

	// Default color representation of the input/output textbox.
	// Valid options are `HEX`, `RGBA`, `HSVA`, `HSLA` and `CMYK`.
	defaultRepresentation: 'RGBA',

	components: {

		// Defines if the palette itself should be visible.
		// Will be overwritten with true if preview, opacity or hue are true
		palette: true,

		// Main components
		preview: false,
		opacity: true,
		hue: true,

		// Input / output Options
		interaction: {
			hex: true,
			rgba: true,
			hsla: true,
			hsva: true,
			cmyk: true,
			input: true,
			clear: false,
			save: false
		}
	}
});

// Variables
const ColorButton = document.getElementById("buttonChangeColor");
const RGBInput = document.getElementById("rgbInput");
const VecInput = document.getElementById("vecInput");
const HexInput = document.getElementById("hexInput");
const HSVInput = document.getElementById("hsvInput");

pickr.on('change', ( color, eventSource, instance ) =>
{
	UpdateButtonUI(color);
	UpdateColor(color);
});

function UpdateColor(color)
{
	// RGBA
	const desiredRGB = `${Math.round(color.toRGBA()[0])}, ${Math.round(color.toRGBA()[1])}, ${Math.round(color.toRGBA()[2])}, ${color.toRGBA()[3]}`;

	// VECTOR4
	const desiredVectorRGB = rgbToVec(`rgba(${color.toRGBA()[0]}, ${color.toRGBA()[1]}, ${color.toRGBA()[2]}, ${color.toRGBA()[3]})`); // vec.r vec.g vec.b vec.a
	desiredVector = `${desiredVectorRGB.r}, ${desiredVectorRGB.g}, ${desiredVectorRGB.b}, ${desiredVectorRGB.a}`;

	// Hex
	const desiredHex = `#${color.toHEXA().join('')}`;
	console.log(desiredHex);

	// HSVA
	const desiredHSV = `${Math.round(color.h)}°, ${Math.round(color.s)}%, ${Math.round(color.v)}%, ${color.a}`;

	// Update every input/textbox
	RGBInput.value = desiredRGB;
	VecInput.value = desiredVector;
	HexInput.value = desiredHex;
	HSVInput.value = desiredHSV;
}

function UpdateWithRGB(val)
{
	const rgbaVal = `rgba(${val})`;
	pickr.setColor(rgbaVal);
}

function UpdateWithVector(val)
{
	const rgbaVal = vecToRgb(`vec4(${val})`);
	pickr.setColor(`rgba(${rgbaVal.r}, ${rgbaVal.g}, ${rgbaVal.b}, ${rgbaVal.a})`);
}

function UpdateWithHex(val)
{
	const hex = `#${color.toHEXA().join('')}`;
	pickr.setColor(hex);
}

function UpdateWithHSV(val) {
	pickr.setColor(`hsva(${val})`);
}

function UpdateButtonUI(color)
{
	// Get colors
	const hex = `#${color.toHEXA().join('')}`; // example: #3abd21

	// Clear button text
	ColorButton.style.color = `transparent`;

	// Set button color to selected color
	ColorButton.style.backgroundColor = hex;
}
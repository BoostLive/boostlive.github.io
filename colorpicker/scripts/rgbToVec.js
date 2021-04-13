/*
    SOURCE: https://gist.github.com/m4n1ok/4451242c4b8a82506ccb9fb3ebc1dce2
*/

function normalize(min, max, value)
{
    if (value < min)
        return min
    else if (value > max)
        return max
    else
        return value
}

function splitChannels(color, split)
{
    color = color.replace(split, '').replace(')', '').trim()

    let channels = color.split(',')

    if (channels.length < 3 || channels.length > 4) {
        throw new Error(`${color} is not a valid rgb(a) color`)
    }

    return channels
}

function getChannels(color)
{
    let alpha = false

    if (color.startsWith('r'))
    {
        if (color.startsWith(`rgba(`))
            alpha = true
        else if (color.startsWith(`rgb(`))
            alpha = false

        const split = alpha ? `rgba(` : `rgb(`
        return splitChannels(color, split)
    }
    else if (color.startsWith('v')) // Vector to rgb
    {
        if (color.startsWith(`vec4(`)) alpha = true
        else if (color.startsWith(`vec3(`)) alpha = false

        const split = alpha ? `vec4(` : `vec3(`
        return splitChannels(color, split)
    } else {
        throw new Error(`${color} is not a valid rgb(a) color`)
    }
}

const rgbToVec = (color) =>
{
    let channels = getChannels(color)
    channels = channels.map(c => parseFloat(c)).map(c => normalize(0, 255, c))

    let [r, g, b, a] = []

    if (channels.length === 4) {
        [r, g, b, a] = channels
    } else {
        [r, g, b, a = 1] = channels
    }

    const rgb = [r, g, b].map(c => Math.round(c / 255 * 10) / 10)
    const alpha = normalize(0, 1, a)

    // return `vec4(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
    return {
        r: rgb[0],
        g: rgb[1],
        b: rgb[2],
        a: alpha
    }
}

const vecToRgb = (color) =>
{
	let channels = getChannels(color)
	channels = channels.map(c => parseFloat(c)).map(c => normalize(0, 1, c))
	let [r, g, b, a] = []

	if (channels.length === 4) {
		[r, g, b, a] = channels
	} else {
		[r, g, b, a = 1] = channels
	}

	const rgb = [r, g, b].map(c => Math.round(c * 255))
	const alpha = normalize(0, 1, a)

	// return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
    return {
        r: rgb[0],
        g: rgb[1],
        b: rgb[2],
        a: alpha
    }
}
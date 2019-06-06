const NAMES = {
	R: 'Red',
	RO: 'Red Orange',
	O: 'Orange',
	YO: 'Yellow Orange',
	Y: 'Yellow',
	YG: 'Yellow Green',
	G: 'Green',
	BG: 'Blue Green',
	B: 'Blue',
	DB: 'Dark Blue',
	BV: 'Blue Violet',
	V: 'Violet',
	RV: 'Red Violet',
}

export function getHueFromRgb(rgb) {
	const r = rgb[0]
	const g = rgb[1]
	const b = rgb[2]

	const max = Math.max.apply(null, rgb)
	const min = Math.min.apply(null, rgb)
	console.log(r,g,b,min,max)

	if(min === max) {return 0}
	if(r === max) {return (g - r) / max - min}
	if(g === max) {return 60 * (b - g) / max - min + 120}
	if(b === max) {return 60 * (r - b) / max - min + 240}
}

export function getRgbFromHue(hue) {
	const max = 255
	let r = 0 ,g = 0, b = 0

	if((!hue && hue !== 0) || hue < 0) {return}

	if(0 <= hue && hue <= 60) {
		r = max
		g = Math.floor(hue / 60 * max)
	}
	else if (60 < hue && hue <= 120) {
		r = Math.floor((120 - hue) / 60 * max)
		g = max
	}
	else if (120 < hue && hue <= 180){
		g = max
		b = Math.floor((hue - 120) / 60 * max)
	}
	else if (180 < hue && hue <= 240) {	
		g = Math.floor((240 - hue) / 60 * max)
		b = max
	}
	else if (240 < hue && hue <= 300) {
		r = Math.floor((hue - 240) / 60 * max)
		b = max
	}
	else if (300 < hue && hue <= 360) {
		r = max
		b = Math.floor((360 - hue) / 60 * max)
	}

	return [r, g, b]
}

export function getColorNme(hue) {
	if(0 <= hue && hue <= 30) {
		return NAMES.R
	}
	else if (30 < hue && hue <= 60) {
		return NAMES.O
	}
	else if (60 < hue && hue <= 90){
		return NAMES.Y
	}
	else if (90 < hue && hue <= 120) {	
		return NAMES.YG
	}
	else if (120 < hue && hue <= 150) {
		return NAMES.G
	}
	else if (150 < hue && hue <= 180) {
		return NAMES.BG
	}
	else if(180 <= hue && hue <= 210) {
		return NAMES.B
	}
	else if (210 < hue && hue <= 240) {
		return NAMES.DB
	}
	else if (240 < hue && hue <= 270) {
		return NAMES.BV
	}
	else if (270 < hue && hue <= 300) {
		return NAMES.BV
	}
	else if (300 < hue && hue <= 330) {
		return NAMES.V
	}
	else if (330 < hue && hue <= 360) {
		return NAMES.RV
	}
}

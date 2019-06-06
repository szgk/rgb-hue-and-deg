import {getRgbFromHue} from '../src/utils/color'

it('getRgbFromHue', () => {
	expect(getRgbFromHue(0)).toEqual([255, 0, 0])
	expect(getRgbFromHue(30)).toEqual([255, 127, 0])
	expect(getRgbFromHue(60)).toEqual([255, 255, 0])
	expect(getRgbFromHue(120)).toEqual([0, 255, 0])
	expect(getRgbFromHue(180)).toEqual([0, 255, 255])
	expect(getRgbFromHue(240)).toEqual([0, 0, 255])
	expect(getRgbFromHue(300)).toEqual([255, 0, 255])
	expect(getRgbFromHue(330)).toEqual([255, 0, 127])
	expect(getRgbFromHue(360)).toEqual([255, 0, 0])
})

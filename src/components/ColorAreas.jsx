import React from 'react'
import {getRgbFromHue, getColorNme} from '../utils/color'

export default class App extends React.Component {

	/**
	 * render
	 */
	render () {
		let areas = [], areaInfos = []
		const {view, radius, display} = this.props
		const areasStyle = {display: display ? 'block' : 'none'}
		const half = view/2

		/**
		 * color areas
		 */
		for(let i = 0; i<360; i+=30){
			const areaCosign = Math.cos(i * Math.PI/180)
			const areaSsign = Math.sin(i * Math.PI/180)

			const infoScale = 100
			const areaScale = 50
			const areaX = half + (radius + areaScale) * Math.sqrt(3)/2
			const areaY = half - (radius + areaScale) * 1/2
			const areaFill = `rgba(${getRgbFromHue(i).toString()},0.4`

			const areaParams = {
				key: `area_${i}`,
				d: `M ${half + radius + areaScale} ${half} L ${half} ${half}, L ${areaX} ${areaY}`,
				transform: `rotate(${i - 90} ${half} ${half})`,
				stroke: 'rgba(0, 0, 0, 0.0)',
				strokeWidth: '1',
				fill: areaFill,
			}
			areas.push(<path className="color_area" {...areaParams}/>)

			const areaInfoYdiff = i === 0 ? -40 : 0 < i && i < 180 ? -50 : 0
			const areaInfoXdiff = i === 0 ? 10 : 0 < i && i < 180 ? 10 : 0
			const x = half + (radius + infoScale) * areaCosign + areaInfoXdiff
			const y = half - (radius + infoScale) * areaSsign + areaInfoYdiff
			const colorName = getColorNme(360 - i)
			const areaInfoParams =  {
				key: `area_info_${i}`,
				x,
				y,
				transform: `rotate(${105} ${x} ${y})`,
				fontSize: '11',
			}
			areaInfos.push(
				<text {...areaInfoParams}>
					<tspan x={x} y={y} fill="#fff">{colorName}</tspan>
					<tspan x={x} y={y+20} fill="#fff">{`${330 - i}°-${360 - i}°`}</tspan>
				</text>)
		}

		return (
			<g style={areasStyle}>
				<g transform={`rotate(${30} ${half} ${half})`}>
					{areas}
				</g>
				<g transform={`rotate(${-105} ${half} ${half})`}>
					{areaInfos}
				</g>
			</g>
		)
	}
}

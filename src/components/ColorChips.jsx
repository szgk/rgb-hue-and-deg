import React from 'react'
import {getRgbFromHue} from '../utils/color'

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			loopFunc: null,
			displayInfoNum: 0
		};
	}

	/**
	 * render
	 */
	render () {
		const {degs, view, radius, display} = this.props
		const {displayInfoNum} = this.state
		const half = view/2
		let rects=[], linerGradient=[], lines = [], infos = []
		const paddingTop = half - radius
		
		degs.forEach((deg, i) => {
			const cosign = Math.cos(deg * Math.PI/180)
			const sign = Math.sin(deg * Math.PI/180)
			
			/**
			 * color chips
			 */
			const chipWidth = 6
			const colorParams =  {
				key: `color_chip_${i}`,
				fill: `url(#g${i})`,
				x: half,
				y: paddingTop,
				width: chipWidth,
				transform: `rotate(${deg} ${half} ${half})`,
				height: radius,
				stroke: 'rgba(0,0,0,0)',
				strokeWidth: '0'
			}
			rects.push(<rect className="color_chip" {...colorParams}/>)

			linerGradient.push(
				<linearGradient key={`${deg}-grad`} id={`g${i}`} x1="0" y1="1" x2="0" y2="0">
					<stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
					<stop offset="80%" stopColor="rgba(255, 255, 255, 0)" />
					<stop offset="80%" stopColor={`rgba(${getRgbFromHue(deg).toString()}`} />
					<stop offset="100%" stopColor={`rgba(${getRgbFromHue(deg).toString()}`} />
				</linearGradient>
			)
			
			/**
			 * color infos
			 */
			const infoScale = 140
			const infoYdiff = 180 < deg && deg < 360 ? -70 : 0
			const infoX = half + (radius + infoScale) * cosign
			const infoY = half + (radius + infoScale) * sign + infoYdiff
			const infosStyle = {display: display && displayInfoNum === i ? 'block' : 'none'}

			const infosParams =  {
				key: `info_${i}`,
				x: infoX,
				y: infoY,
				fontSize: '14',
				style: infosStyle,
			}
			infos.push(
				<text
					transform={`rotate(${90} ${infoX} ${infoY})`}
					className="color_info1"
					{...infosParams}
				>
					<tspan x={infoX} y={infoY} fill="#fff">{`rgb(${getRgbFromHue(deg).toString()})`}</tspan>
					<tspan x={infoX} y={infoY+20} fill="#fff">{`${deg}°`}</tspan>
				</text>
			)

			const lineX = half + radius
			const lineY = half + chipWidth/2
			const lineParams =  {
				key: `info_line_${i}`,
				d: `M ${lineX} ${lineY} L ${lineX + 120} ${lineY}`,
				transform: `rotate(${deg} ${half} ${half})`,
				stroke: 'rgba(255, 255, 255, 1)',
				strokeWidth: '1',
				fill: 'none',
				style: infosStyle,
			}
			lines.push(<path className="color_info_line" {...lineParams}/>)
		})

		return (
			<g>
				<defs>
					{linerGradient}
				</defs>
				{rects}
				<g
					style={{display: display ? 'block' : 'none'}}
					transform={`rotate(${-90} ${half} ${half})`}
				>
					{lines}
					{infos}
				</g>
			</g>
		)
	}
}

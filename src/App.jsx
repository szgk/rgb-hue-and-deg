import React from 'react'
import ColorChips from './components/ColorChips'
import ColorAreas from './components/ColorAreas'
import styles from './styles/app.styl'

export default class App extends React.Component {
	constructor(props) {
		super(props);
		const degs = []
		for(let i = 0; i<360; i+=8){
			degs.push(i)
		}
		this.state={
			loopFunc: null,
			degs,
			view: 700,
			viewHeight: 700,
			radius: 100,
			displayAreas: true,
			displayInfos: true,
			displayInfoNum: 0
		};

		this.start = this.start.bind(this)
		this.loop = this.loop.bind(this)
		this.stop = this.stop.bind(this)
		this.changeDisplayInfos = this.changeDisplayInfos.bind(this)
		this.changeDisplayAreas = this.changeDisplayAreas.bind(this)
	}

	start() {
		if(this.state.loopFunc) {return}
		this.loop();
	}

	loop() {
		const newDegs = this.state.degs.map(deg => deg+1 < 360 ? deg+1 : 0)
		this.setState(() => ({
			degs: [
				...newDegs,
			],
		}))
		this.state.loopFunc = setTimeout(this.loop, 50)
	}

	stop() {
		clearTimeout(this.state.loopFunc)
		this.state.loopFunc = null
	}

	changeDisplayInfos() {
		this.setState(() => ({
			...this.state,
			displayInfos: !this.state.displayInfos,
		}))
	}

	changeDisplayAreas() {
		this.setState(() => ({
			...this.state,
			displayAreas: !this.state.displayAreas,
		}))
	}

	/**
	 * render
	 */
	render () {
		const {displayAreas, displayInfos, view, viewHeight, radius, degs} = this.state

		return (
			<div>
				<header>
					<h1 className={styles.title}>RGB hue &amp; deg</h1>
				</header>
				<svg
					className={styles.svg_space}
					width={`${view}px`}
					height={`${viewHeight}px`}
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
				>
					<ColorAreas
						display={displayAreas}
						view={view}
						radius={radius}
					/>
					<ColorChips
						display={displayInfos}
						degs={degs}
						view={view}
						radius={radius}
					/>
				</svg>
				<div className={styles.control_button_area}>
					<button className={styles.control_button} onClick={this.start}>start</button>
					<button className={styles.control_button} onClick={this.stop}>stop</button>
					<button className={styles.control_button} onClick={this.changeDisplayInfos}>info</button>
					<button className={styles.control_button} onClick={this.changeDisplayAreas}>area</button>
				</div>
			</div>
		)
	}
}

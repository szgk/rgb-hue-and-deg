import React from 'react'
import {render} from 'react-dom'
import App from './App'
import './styles/main.styl'

window.onload = function() {
	render(<App/>, document.getElementById('app'))
}
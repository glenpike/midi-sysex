import React, { useContext } from 'react'
import WebMidiContext from '../../contexts/WebMidiContext.js'

import { bytesToHex } from '../../utils.js'

import Slider from '../Slider/Slider.js'

const ReverbControl = ({ sliderConfig }) => {
	const { midiInitialised, currentOutput, sendSysexMessage } = useContext(WebMidiContext)

	const changeHandler = (address, value) => {
		sendSysexMessage(address, value)
	}
	
	const sliders = sliderConfig.controls.reduce((acc, control) => {
		if (control.type == 'range') {
			const id = bytesToHex(control.address)
			const disabled = !(midiInitialised && currentOutput)
			acc.push({ id, changeHandler, disabled, ...control })
		}
		return acc
	}, [])

	return (
		<div>
			{ sliders.map((slider, index) => {
					return <Slider key={index} { ...slider }/>
			})}
		</div>
	)
}

export default ReverbControl

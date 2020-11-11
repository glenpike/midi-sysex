import React, { useContext } from 'react'
import WebMidiContext from '../webmidi-context'

import { reverbControls } from '../controls.js'
import { bytesToHex, checkSum } from '../utils.js'

import Slider from './slider.js'

const ReverbControl = () => {

	const { midiInitialised, currentOutput, sendSysexMessage } = useContext(WebMidiContext)
	
	const makeSysexData = (address, value) => {
		const deviceId = 0x10
		const modelId = [0x00, 0x0b]
		const sendCmd = 0x12
		const fullAddress = [0x01, 0x00].concat(address)
		const check = checkSum(fullAddress.concat(value))
		const data = [].concat(deviceId, modelId, sendCmd, fullAddress, value, check)
		return data;
	}

	const changeHandler = (address, value) => {
		console.log('changeHandler ', value, address)
		const data = makeSysexData(address, value)
		sendSysexMessage(data)
	}
	
	const sliders = reverbControls.controls.reduce((acc, control) => {
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

import React, { useContext } from 'react'
import WebMidiContext from '../../contexts/WebMidiContext.js'

import { bytesToHex } from '../../utils.js'

import Slider from '../Slider/Slider.js'
import RadioOptions from '../RadioOptions/RadioOptions.js'
import './GroupControl.scss'

const GroupControl = ({ sliderConfig }) => {
	const { midiInitialised, currentOutput, sendSysexMessage } = useContext(
		WebMidiContext
	)

	const changeHandler = (address, value) => {
		sendSysexMessage(address, value)
	}

	const controls = sliderConfig.controls.reduce((acc, control) => {
		const id = `control_${bytesToHex(control.address).replace(/,/g, '_')}`
		// console.log('slider id: ', id, ' for ', control.label)
		const disabled = !(midiInitialised && currentOutput)
		acc.push({ id, changeHandler, disabled, ...control })
		return acc
	}, [])

	return (
		<fieldset className="group-control">
			<legend>{sliderConfig.name}</legend>
			{controls.map((control) => {
				const isSlider = control.type == 'range'
				return (
					<React.Fragment key={control.id}>
						{isSlider
							? <Slider {...control} />
							: <RadioOptions {...control}/>
						}
					</React.Fragment>
				)
			})}
		</fieldset>
	)
}

export default GroupControl

import React, { useContext } from 'react'
import WebMidiContext from '../../contexts/WebMidiContext.js'

import { bytesToHex } from '../../utils.js'

import Slider from '../Slider/Slider.js'
import RadioOptions from '../RadioOptions/RadioOptions.js'

const ReverbControl = ({ sliderConfig }) => {
	const { midiInitialised, currentOutput, sendSysexMessage } = useContext(
		WebMidiContext
	)

	const changeHandler = (address, value) => {
		sendSysexMessage(address, value)
	}

	const controls = sliderConfig.controls.reduce((acc, control) => {
		const id = `control_${bytesToHex(control.address).replace(/,/g, '_')}`
		const disabled = !(midiInitialised && currentOutput)
		acc.push({ id, changeHandler, disabled, ...control })
		return acc
	}, [])

	return (
		<React.Fragment>
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
		</React.Fragment>
	)
}

export default ReverbControl

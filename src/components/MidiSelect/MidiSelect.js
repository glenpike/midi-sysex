import React, { useContext, useEffect } from 'react'
import WebMidiContext from '../../contexts/WebMidiContext.js'

const MidiSelect = () => {
	const {
		currentOutput,
		midiOutputs,
		setCurrentOutput,
		initialise,
	} = useContext(WebMidiContext)

	const selectedIndex = midiOutputs && midiOutputs.indexOf(currentOutput)

	useEffect(() => {
		initialise()
	})

	const handleOutputChange = (event) => {
		const index = +event.target.value
		setCurrentOutput(index)
	}

	return (
		<div className="midi-select">
			<label htmlFor="midi-output-select"> Midi Output Device </label>{' '}
			<select
				id="midi-output-select"
				value={selectedIndex}
				onChange={handleOutputChange}
			>
				<option value="-1"> Please select </option>{' '}
				{midiOutputs.map((midiOutput, index) => {
					return (
						<option key={index} value={index}>
							{' '}
							{midiOutput.name}{' '}
						</option>
					)
				})}{' '}
			</select>
		</div>
	)
}

export default MidiSelect

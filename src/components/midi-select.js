import React, { useContext, useEffect } from 'react';
import WebMidiContext from '../webmidi-context';

const MidiSelect = () => {

	const { currentOutput, midiOutputs, setCurrentOutput, initialise } = useContext(WebMidiContext)

	const selectedIndex = midiOutputs && midiOutputs.indexOf(currentOutput)

	useEffect(() => {
		initialise()
	})

	const handleOutputChange = (event) => {
		setCurrentOutput(event.target.value)
	}

	return (
		<div className="midi-select">
			<label htmlFor="midi-output-select">Midi Output Device</label>
			<select id="midi-output-select" value={selectedIndex} onChange={handleOutputChange}>
					<option>Please select</option>
					{ midiOutputs.map((midiOutput, index) => {
							return <option key={index} value={index}>{midiOutput.name}</option>
					})}
				</select>

		</div>
	)
}

export default MidiSelect

import React, { useState } from 'react'
import WebMidi from 'webmidi'
import { bytesToHex } from '../utils.js'

const sysexEnabled = true

const WebMidiContext = React.createContext({
	midiInitialised: false,
	currentOutput: null,
	midiOutputs: null,
	initialise: () => {},
	setCurrentOutput: () => {},
	getCurrentOutput: () => {},
	sendSysexMessage: () => {},
})

const WebMidiContextProvider = ({children}) => {

	const [currentOutput, _setCurrentOutput] = useState(null)

	const [midiOutputs, setMidiOutputs] = useState([])

	const [midiInitialised, setMidiInitialised] = useState(false)

	const initialise = () => {
		WebMidi.enable(function (err) {
			const { outputs } = WebMidi
			const outputsArray = []
			for (const output of outputs) {
				outputsArray.push(output)
			}
			setCurrentOutput(null)
			setMidiOutputs(outputsArray)
			setMidiInitialised(true)
		}, sysexEnabled)
	}

	const setCurrentOutput = (index) => {
		_setCurrentOutput(midiOutputs[index])
	}

	const getCurrentOutput = () => {
		if(currentOutput) {
			return WebMidi.getOutputById(currentOutput.id)
		}
		return null
	}

	const sendSysexMessage = (data) => {
		const manufacturer = 0x41
		const output = getCurrentOutput()
		if(output) {
			console.log(`sending sysex message: ${bytesToHex(data)}`)
			output.sendSysex(manufacturer, data)
		}
	}

	const webMidiContextValue = {
		midiInitialised,
		currentOutput,
		midiOutputs,
		initialise,
		setCurrentOutput,
		getCurrentOutput,
		sendSysexMessage,
	}

	return (
		<WebMidiContext.Provider value={webMidiContextValue}>
			{children}
		</WebMidiContext.Provider>
	)
}

export default WebMidiContext
export { WebMidiContextProvider }

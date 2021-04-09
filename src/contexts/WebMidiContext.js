import React, { useState } from 'react'
import WebMidi from 'webmidi'
import { bytesToHex, checkSum } from '../utils.js'

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

const WebMidiContextProvider = ({ children }) => {
	console.log('WebMidi mocked?')
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
		let output = null
		if (index >= 0 && index < midiOutputs.length) {
			output = midiOutputs[index]
		}
		_setCurrentOutput(output)
	}

	const getCurrentOutput = () => {
		if (currentOutput) {
			return WebMidi.getOutputById(currentOutput.id)
		}
		return null
	}

	const makeSysexData = (address, value) => {
		const deviceId = 0x10
		const modelId = [0x00, 0x0b]
		const sendCmd = 0x12
		const fullAddress = [0x01, 0x00].concat(address)
		const check = checkSum(fullAddress.concat(value))
		const data = [].concat(
			deviceId,
			modelId,
			sendCmd,
			fullAddress,
			value,
			check
		)
		return data
	}

	const sendSysexMessage = (address, value) => {
		const data = makeSysexData(address, value)
		const manufacturer = 0x41
		const output = getCurrentOutput()
		if (output) {
			console.log(`sending sysex message: ${bytesToHex(data)}`)
			try {
				output.sendSysex(manufacturer, data)
			} catch(RangeError) {
				console.log(`RangeError for: ${value}`)
			}
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

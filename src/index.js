import WebMidi from 'webmidi'

import { reverbControls } from './controls'
import { createSlider } from './elements'

const checkSum = (data) => {
	return 128 - (data.reduce((sum, value) => (sum + +value), 0)  % 128)
}

const bytesToHex = (bytes) => {
	return bytes.reduce((hex, byte) => {
		return hex + `${(byte >>> 4).toString(16)}${(byte & 0xf).toString(16)} `
	}, '')
}

const testReverbValue = (output) => {
	const data = makeSysexData([0x00, 0x28], 0x05)
	sendSysexMessage(output, data)
}

const makeSysexData = (address, value) => {
	const deviceId = 0x10
	const modelId = [0x00, 0x0b]
	const sendCmd = 0x12
	const fullAddress = [0x01, 0x00].concat(address)
	const check = checkSum(fullAddress.concat(value))
	const data = [].concat(deviceId, modelId, sendCmd, fullAddress, value, check)
	return data;
}

const sendSysexMessage = (output, data) => {
	const manufacturer = 0x41
	console.log(`sysex message: ${bytesToHex(data)}`)
	output.sendSysex(manufacturer, data)
}

// Get the dropdown box from the HTML doc & disable it.
const outputList = document.querySelector('.js-midi-device')
outputList.disabled = true

const sysexEnabled = true

WebMidi.enable(function (err) {
	let htmlStr = '<option value="none">Select</option>'
	const { outputs } = WebMidi
	for (const output of outputs) {
		htmlStr += `<option value=${output.id}>${output.name}</option>`
	}
	outputList.innerHTML = htmlStr
	outputList.disabled = false
}, sysexEnabled)

// When an output is selected, get the device for it and ask
// the midiInput to map our controls.
outputList.addEventListener('change', (event) => {
	const outputId = outputList.selectedOptions[0].value
	if (outputId !== 'none') {
		const output = WebMidi.getOutputById(outputId)
		if (output) {
			testReverbValue(output)
		}
	}
})

const controlContainer = document.querySelector('.js-controls')
let html = ''
for(const control of reverbControls.controls) {
	if (control.type == 'range') {
		const id = bytesToHex(control.address)
		console.log(`id: ${id}`)
		const slider = createSlider({ id, ...control })
		html += slider
	}
}
controlContainer.innerHTML = html

controlContainer.addEventListener('change', (event) => {
	const input = event.target
	const value = [input.value]
	const address = event.target.dataset.address.split(',')
	console.log('change ', event.target, value, address)
	const outputId = outputList.selectedOptions[0].value
	if (outputId !== 'none') {
		const output = WebMidi.getOutputById(outputId)
		if (output) {
			const data = makeSysexData(address, value)
			sendSysexMessage(output, data)
		}
	}
})

import WebMidi from 'webmidi'

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

const checkSum = (data) => {
	return 128 - data.reduce((sum, value) => (sum + value) % 128, 0)
}

const testReverbValue = (output) => {
	const manufacturer = 0x41
	const deviceId = 0x10
	const modelId = [0x00, 0x0b]
	const sendCmd = 0x12
	let address = [0x01, 0x00, 0x00, 0x28]
	let value = 0x05
	let check = checkSum(address.concat(value))
	const data = [].concat(deviceId, modelId, sendCmd, address, value, check)
	console.log(bytesToHex(data), WebMidi.sysexEnabled)
	output.sendSysex(manufacturer, data)
}

const bytesToHex = (bytes) => {
	bytes.reduce((hex, byte) => {
		return hex + `${(byte >>> 4).toString(16)}${(byte & 0xf).toString(16)} `
	}, '')
}

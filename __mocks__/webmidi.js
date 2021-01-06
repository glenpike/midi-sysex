const WebMidi = jest.createMockFromModule('webmidi');

const sendSysEx = jest.fn()
const outputs = [
	{
		id: 1,
		name: 'test-output-1',
		sendSysEx
	},
	{
		id: 2,
		name: 'test-output-2',
		sendSysEx
	}
]

WebMidi.outputs = outputs
WebMidi.getOutputById = (id) => {
	return outputs.find(output => output.id === id)
}
WebMidi.enable = ((callback) => {
	callback()
})

export default WebMidi

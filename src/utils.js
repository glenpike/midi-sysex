const checkSum = (data) => {
	return 128 - (data.reduce((sum, value) => sum + +value, 0) % 128)
}

const bytesToHex = (bytes) => {
	return bytes
		.reduce((hex, byte) => {
			return hex + `${(byte >>> 4).toString(16)}${(byte & 0xf).toString(16)} `
		}, '')
		.trim()
		.replace(/ /g, ',')
}

// const testReverbValue = (output) => {
// 	const data = makeSysexData([0x00, 0x28], 0x05)
// 	sendSysexMessage(output, data)
// }

export { checkSum, bytesToHex }

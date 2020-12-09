const reverbControls = {
	name: 'Reverb',
	controls: [
		{
			label: 'Reverb Type',
			address: [0x00, 0x28],
			type: 'options',
			range: ['ROOM1', 'ROOM2', 'STAGE1', 'STAGE2', 'HALL1', 'HALL2'],
			value: 'STAGE1',
		},
		{
			label: 'Reverb Level',
			address: [0x00, 0x29],
			type: 'range',
			range: [0, 127],
			value: 127,
		},
		{
			label: 'Reverb Time',
			address: [0x00, 0x2a],
			type: 'range',
			range: [0, 127],
			value: 90
		},
		{
			label: 'Reverb HF Damp',
			address: [0x00, 0x2b],
			type: 'options',
			range: [
				'200',
				'250',
				'315',
				'400',
				'500',
				'630',
				'800',
				'1000',
				'1250',
				'1600',
				'2000',
				'2500',
				'3150',
				'4000',
				'5000',
				'6300',
				'8000',
				'BYPASS',
			],
			value: '4000',
		},
	],
}

const delayControls = {
	name: 'Delay',
	controls: [
		{
			label: 'Delay Type',
			address: [0x00, 0x28],
			type: 'options',
			range: ['ROOM1', 'ROOM2', 'STAGE1', 'STAGE2', 'HALL1', 'HALL2'],
			value: 'STAGE1',
		},
	]
}
const controlConfig = [ reverbControls, delayControls ] 
export { controlConfig }

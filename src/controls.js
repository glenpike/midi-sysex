const FREQ_RANGE = [
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
]

const BYPASS_FREQ_RANGE = FREQ_RANGE.slice(0).concat(['BYPASS'])

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
			range: BYPASS_FREQ_RANGE,
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
			range: ['SHORT', 'LONG'],
			value: 'SHORT',
		},
		{
			label: 'Delay Level',
			address: [0x00, 0x22],
			type: 'range',
			range: [0, 127],
			value: 127,
		},
		{
			label: 'Delay HF Damp',
			address: [0x00, 0x24],
			type: 'options',
			range: BYPASS_FREQ_RANGE,
			value: 'BYPASS',
		},
		{
			label: 'Delay Time',
			address: [0x00, 0x25],
			type: 'range',
			range: [0, 120],
			value: 114
		},
		{
			label: 'Delay Feedback',
			address: [0x00, 0x26],
			type: 'range',
			range: [0, 98],
			value: 50
		},
		{
			label: 'Delay Output',
			address: [0x00, 0x27],
			type: 'options',
			range: [
				'MIX',
				'REVERB',
				'MIX+REV',
			],
			value: 'MIX+REV',
		},
	]
}

const outputLevel = {
	label: 'Output Level',
	type: 'range',
	range: [0, 127],
	value: 127
}

const outputPan = {
	label: 'Output Pan',
	type: 'range',
	range: [0, 127],
	value: 64
}

const efxTypes = [
	{
		name: '4-Band-EQ',
		controls: [{
				label: 'Low Freq',
				type: 'options',
				range: ['200', '400'],
				value: '200'
			},
			{
				label: 'Low Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			{
				label: 'High Freq',
				type: 'options',
				range: ['4000', '8000'],
				value: '4000'
			},
			{
				label: 'High Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			{
				label: 'Peak1 Freq',
				type: 'options',
				range: FREQ_RANGE,
				value: '1000'
			},
			{
				label: 'Peak1 Q',
				type: 'options',
				range: ['0.5', '1.0', '2.0', '4.0', '8.0'],
				value: '1.0'
			},
			{
				label: 'Peak1 Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			{
				label: 'Peak2 Freq',
				type: 'options',
				range: FREQ_RANGE,
				value: '1000'
			},
			{
				label: 'Peak2 Q',
				type: 'options',
				range: ['0.5', '1.0', '2.0', '4.0', '8.0'],
				value: '1.0'
			},
			{
				label: 'Peak2 Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			outputLevel,
		]
	},
	{
		name: 'SPECTRUM',
		controls: [{
				label: 'Low-High',
				type: 'range',
				range: [0, 30],
				value: 19
			},
			{
				label: 'Middle Gain',
				type: 'range',
				range: [0, 30],
				value: 22
			},
			{
				label: 'Width',
				type: 'range',
				range: [0, 4],
				value: 0
			},
			outputPan,
			outputLevel,
		]
	},
	{
		name: 'ENHANCER',
		controls: [{
				label: 'Sensitivity',
				type: 'range',
				range: [0, 127],
				value: 127
			},
			{
				label: 'Mix',
				type: 'range',
				range: [0, 127],
				value: 64
			},
			{
				label: 'Low-Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			{
				label: 'High Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			outputLevel,
		]
	},
	{
		name: 'OVERDRIVE',
		controls: [{
				label: 'Input Level',
				type: 'range',
				range: [0, 127],
				value: 100
			},
			{
				label: 'Drive',
				type: 'range',
				range: [0, 127],
				value: 100
			},
			{
				label: 'AMP Type',
				type: 'options',
				range: ['SMALL', 'BUILTIN', '2STACK', '3STACK'],
				value: 'BUILTIN'
			},
			outputPan,
			outputLevel,
		]
	},
	{
		name: 'DISTORTION',
		controls: [{
				label: 'Input Level',
				type: 'range',
				range: [0, 127],
				value: 100
			},
			{
				label: 'Drive',
				type: 'range',
				range: [0, 127],
				value: 100
			},
			{
				label: 'AMP Type',
				type: 'options',
				range: ['SMALL', 'BUILTIN', '2STACK', '3STACK'],
				value: '3STACK'
			},
			outputPan,
			outputLevel,
		]
	},
	{
		name: 'Lo-Fi',
		controls: [{
				label: 'BitDown',
				type: 'range',
				range: [0, 7],
				value: 2
			},
			{
				label: 'S-Rate Down',
				type: 'options',
				range: ['32', '16', '8', '4'],
				value: '8'
			},
			{
				label: 'Post Gain',
				type: 'options',
				range: ['0', '+6', '+12', '+18'],
				value: '+12'
			},
			{
				label: 'Low-Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			{
				label: 'High Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			{
				label: 'Output',
				type: 'options',
				range: ['Mono', 'Stereo'],
				value: 'Stereo'
			},
			outputLevel,
		]
	},
	{
		name: 'NOISE',
		controls: [{
				label: 'Noise Type',
				type: 'range',
				range: [0, 17],
				value: 2
			},
			{ 
				label: 'Noise Level',
				type: 'range',
				range: [0, 127],
				value: 2
			},
			{ 
				label: 'N Filter',
				type: 'range',
				range: BYPASS_FREQ_RANGE,
				value: '315',
			},
			{ 
				label: 'Lo-Fi Level',
				type: 'range',
				range: [0, 127],
				value: 15
			},
			outputPan,
			outputLevel,
		]
	},
	{
		name: 'RADIO-TUNG',
		controls: [{
				label: 'Radio Detune',
				type: 'range',
				range: [0, 127],
				value: 64
			},
			{
				label: 'Noise Level',
				type: 'range',
				range: [0, 127],
				value: 0
			},
			{
				label: 'Low-Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			{
				label: 'High Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			{
				label: 'Output',
				type: 'options',
				range: ['Mono', 'Stereo'],
				value: 'Stereo'
			},
			outputLevel,
		]
	},
	{
		name: 'PHONOGRAPH',
		controls: [{
				label: 'Disc Type',
				type: 'options',
				range: ['LP', 'EP', 'SP'],
				value: 'LP'
			},
			{
				label: 'D Noise Lvl',
				type: 'range',
				range: [0, 127],
				value: 0
			},
			{
				label: 'Depth',
				type: 'range',
				range: [0, 20],
				value: 10
			},
			outputPan,
			outputLevel,
		]
	},
	{
		name: 'COMPRESSOR',
		controls: [{
				label: 'Attack',
				type: 'range',
				range: [0, 127],
				value: 64
			},
			{
				label: 'Sustain',
				type: 'range',
				range: [0, 127],
				value: 127
			},
			{
				label: 'Post Gain',
				type: 'options',
				range: ['0', '+6', '+12', '+18'],
				value: '+6'
			},
			{
				label: 'Low-Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			{
				label: 'High Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			outputLevel,
		]
	},
	{
		name: 'LIMITER',
		controls: [{
				label: 'Threshold',
				type: 'range',
				range: [0, 127],
				value: 64
			},
			{
				label: 'Ratio',
				type: 'options',
				range: ['1.5:1', '2.0:1', '4.0:1', '100:1'],
				value: '4.0:1'
			},
			{
				label: 'Release',
				type: 'range',
				range: [0, 127],
				value: 32
			},
			{
				label: 'Post Gain',
				type: 'options',
				range: ['0', '+6', '+12', '+18'],
				value: '+6'
			},
			outputPan,
			outputLevel,
		]
	},
	{
		name: 'SLICER',
		controls: [{
				label: 'Timing',
				type: 'range',
				//FIXME - patterns like 'o_o_o_o_o_o_o_o_'?
				range: [0, 33],
				value: 3
			},
			{
				label: 'Rate',
				type: 'options',
				range: ['1/4', '1/2', '1/1'],
				value: '1/2'
			},{
				label: 'Accent Pattern',
				type: 'range',
				//FIXME - patterns like '-_-_-_-_-_-_-_-_'?
				range: [0, 15],
				value:0
			},
			{
				label: 'Accent Level',
				type: 'range',
				range: [0, 127],
				value: 64
			},
			{
				label: 'Attack',
				type: 'range',
				range: [0, 9],
				value: 6
			},
			outputLevel,
		]
	},
	{
		name: 'TREMOLO',
		controls: [{
				label: 'LFO Type',
				type: 'options',
				range: ['TRI', 'TRP', 'SIN', 'SAW1', 'SAW2', 'SQR',],
				value: 'TRI'
			},{
				label: 'Rate',
				type: 'range',
				//Has numbers and symbols
				range: [0, 117],
				value: 109
			},
			{
				label: 'Depth',
				type: 'range',
				range: [0, 117],
				value: 64
			},
			{
				label: 'Low-Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			{
				label: 'High Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			outputLevel,
		]
	},
	{
		name: 'PHASER',
		controls: [{
				label: 'Manual',
				type: 'range',
				range: [0, 125],
				value: 31
			},
			{
				label: 'Rate',
				type: 'range',
				range: [0, 117],
				value: 109
			},
			{
				label: 'Depth',
				type: 'range',
				range: [0, 127],
				value: 64
			},
			{
				label: 'Resonance',
				type: 'range',
				range: [0, 127],
				value: 64
			},
			{
				label: 'Mix',
				type: 'range',
				range: [0, 127],
				value: 127
			},
			outputPan,
			outputLevel,
		]
	},
	{
		name: 'CHORUS',
		controls: [{
				label: 'Pre Delay',
				type: 'range',
				range: [0, 125],
				value: 10
			},
			{
				label: 'Rate',
				type: 'range',
				range: [0, 117],
				value: 109
			},
			{
				label: 'Depth',
				type: 'range',
				range: [0, 127],
				value: 64
			},
			{
				label: 'Phase',
				type: 'range',
				range: [0, 90],
				value: 90
			},
			{
				label: 'Filter Type',
				type: 'options',
				range: ['OFF', 'LPF', 'HPF'],
				value: 'OFF'
			},
			{
				label: 'Cutoff',
				type: 'range',
				range: FREQ_RANGE,
				value: '1000'
			},
			{
				label: 'Balance',
				type: 'range',
				range: [0, 100],
				value: 50
			},
			outputLevel,
		]
	},
	{
		name: 'SPACE-D',
		controls: [{
				label: 'Pre Delay',
				type: 'range',
				range: [0, 125],
				value: 50
			},
			{
				label: 'Rate',
				type: 'range',
				range: [0, 117],
				value: 115
			},
			{
				label: 'Depth',
				type: 'range',
				range: [0, 127],
				value: 100
			},
			{
				label: 'Phase',
				type: 'range',
				range: [0, 90],
				value: 90
			},
			{
				label: 'Low-Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			{
				label: 'High Gain',
				type: 'range',
				range: [0, 30],
				value: 15
			},
			{
				label: 'Balance',
				type: 'range',
				range: [0, 100],
				value: 50
			},
			outputLevel,
		]
	},
	{
		name: '',
		controls: [{
				label: '',
				type: 'range',
				range: [0, 127],
				value: 127
			},
			{
				label: '',
				type: 'options',
				range: ['',],
				value: ''
			},
			outputLevel,
		]
	}
]

const efxConfig = {
	name: 'EFX Controls',
	efxTypeSelect: {
		label: 'EFX Type',
		address: [0x00, 0x0D],
		type: 'options',
		range: efxTypes.map(efxType => efxType.name),
		value: efxTypes[0].name,
	},
	paramStartAddress: 0x0E,
	maxParams: 12,
	efxTypes
}

const controlConfig = [ reverbControls, delayControls ] 
export { controlConfig, efxConfig }

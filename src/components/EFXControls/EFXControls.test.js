import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, screen } from '@testing-library/react'
// import { screen } from '@testing-library/dom'
import EFXControls from './EFXControls.js'
import WebMidiContext from '../../contexts/WebMidiContext.js'
import { bytesToHex } from '../../utils.js'

describe('EFXControls', () => {
	const efxTypes = [{
		name: 'Control 1',
		controls: [
			{
				label: 'Test 1',
				type: 'range',
				range: [0, 127],
			},
			{
				label: 'Test 2',
				type: 'range',
				range: [0, 127],
			},
		],
	}, 
	{
		name: 'Control 2',
		controls: [
			{
				label: 'Test 3',
				type: 'range',
				range: [0, 127],
				value: 50,
			},
			{
				label: 'Test 4',
				type: 'options',
				range: ['0', '1', '2', '4', '8'],
				value: '2',
			},
			{
				label: 'Test 5',
				type: 'options',
				range: ['0', '1', '2', '3', '4'],
			},
			{
				label: 'Test 6',
				type: 'options',
				range: ['5', '6', '7', '8', '9'],
			}
		],
	}]

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
		efxTypes,
	}

	const sendSysexMessage = jest.fn()

	const provider = {
		midiInitialised: true,
		currentOutput: true,
		sendSysexMessage,
	}

	const renderWithConfig = () => render(
			<WebMidiContext.Provider value={provider}>
				<EFXControls efxConfig={efxConfig} />
			</WebMidiContext.Provider>
		)
	
	// 	beforeEach(() => {
	// 	act(() => {
	// 		;({ container } = render(
	// 			<WebMidiContext.Provider value={provider}>
	// 				<EFXControls efxConfig={efxConfig} />
	// 			</WebMidiContext.Provider>
	// 		))
	// 	})
	// })

	// afterEach(() => {
	// 	container = null
	// })

	it('renders without crashing', () => {
		renderWithConfig()
		expect(screen.getAllByText('EFX Controls')).toHaveLength(1);
	})

	it('renders the selector for the effect types', () => {
		const { container } = renderWithConfig()
		expect(container.querySelectorAll('input[type="radio"]')).toHaveLength(2)
	})
})

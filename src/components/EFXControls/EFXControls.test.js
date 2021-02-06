import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import EFXControls from './EFXControls.js'
import WebMidiContext from '../../contexts/WebMidiContext.js'

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
			// value: efxTypes[0].name,
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

	it('renders without crashing', () => {
		renderWithConfig()
		expect(screen.getByText('EFX Controls')).toBeTruthy()
	})

	it('renders the selector for the effect types', () => {
		renderWithConfig()
		efxTypes.forEach((efxType) => {
			expect(screen.getByLabelText(new RegExp(efxType.name))).toBeTruthy()
		})
	})

	it('shows the default effect controls', () => {
		renderWithConfig()
		efxTypes[0].controls.forEach((control) => {
			expect(screen.getByLabelText(new RegExp(control.label))).toBeTruthy()
		})
	})

	it('shows the default effect controls', () => {
		renderWithConfig()
		const effectOne = screen.getByLabelText(new RegExp(efxTypes[0].name))
		expect(effectOne).toBeChecked()
		efxTypes[0].controls.forEach((control) => {
			expect(screen.getByText(new RegExp(control.label))).toBeTruthy()
		})
	})

	it('hides the unselected effect controls', () => {
		renderWithConfig()
		const effectTwo = screen.getByLabelText(new RegExp(efxTypes[1].name))
		expect(effectTwo).not.toBeChecked()
		efxTypes[1].controls.forEach((control) => {
			expect(screen.queryByText(new RegExp(control.label))).not.toBeTruthy()
		})
	})

	it('I can select and show controls for another effect', () => {
		renderWithConfig()
		const effectTwo = screen.getByLabelText(new RegExp(efxTypes[1].name))
		fireEvent.click(effectTwo)
		efxTypes[1].controls.forEach((control) => {
			expect(screen.getByText(new RegExp(control.label))).toBeTruthy()
		})
		efxTypes[0].controls.forEach((control) => {
			expect(screen.queryByText(new RegExp(control.label))).not.toBeTruthy()
		})
	})

	describe('When a value is passed in', () => {
		beforeAll(() => {
			efxConfig.efxTypeSelect.value = efxTypes[1].name
		})
		afterAll(() => {
			efxConfig.efxTypeSelect.value = null
		})

		it('shows the selected effect controls', () => {
			renderWithConfig()
			const effectTwo = screen.getByLabelText(new RegExp(efxTypes[1].name))
			expect(effectTwo).toBeChecked()
			efxTypes[1].controls.forEach((control) => {
				expect(screen.getByText(new RegExp(control.label))).toBeTruthy()
			})
		})
	
		it('hides the unselected effect controls', () => {
			renderWithConfig()
			const effectOne = screen.getByLabelText(new RegExp(efxTypes[0].name))
			expect(effectOne).not.toBeChecked()
			efxTypes[0].controls.forEach((control) => {
				expect(screen.queryByText(new RegExp(control.label))).not.toBeTruthy()
			})
		})
	})
})

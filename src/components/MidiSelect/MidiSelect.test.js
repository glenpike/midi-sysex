import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import MidiSelect from './MidiSelect.js'
import WebMidiContext from '../../contexts/WebMidiContext.js'

describe('MidiSelect', () => {
	let container

	const midiOutputs = [
		{
			name: 'Midi one',
		},
		{
			name: 'Midi two',
		},
	]

	let currentOutput = null

	const provider = {
		currentOutput,
		midiOutputs,
		setCurrentOutput: jest.fn(),
		initialise: jest.fn((output) => {
			currentOutput = midiOutputs[output]
		}),
	}

	beforeEach(() => {
		act(() => {
			;({ container } = render(
				<WebMidiContext.Provider value={provider}>
					<MidiSelect />
				</WebMidiContext.Provider>
			))
		})
	})

	afterEach(() => {
		container = null
	})

	it('has called initialise', () => {
		expect(provider.initialise).toHaveBeenCalled()
	})

	it('shows our midi outputs', () => {
		expect(container.querySelectorAll('option')).toHaveLength(3)
		midiOutputs.forEach((output, index) => {
			const option = screen.getByText(output.name)
			expect(option).toHaveProperty('value', `${index}`)
		})
	})

	it('calls setCurrentOutput when a midi input is chosen ', () => {
		fireEvent.change(screen.getByDisplayValue(/please select/i), {
			target: { value: '1' },
		})
		expect(provider.setCurrentOutput).toHaveBeenCalledWith(1)
	})

	describe('setting current output', () => {
		it('renders the correctly with no output set', () => {
			expect(container.querySelector('select').value).toBe('-1')
		})

		it('renders the selected output', () => {
			provider.currentOutput = midiOutputs[1]
			act(() => {
				;({ container } = render(
					<WebMidiContext.Provider value={provider}>
						<MidiSelect />
					</WebMidiContext.Provider>
				))
			})
			expect(container.querySelector('select').value).toBe('1')
		})
	})
})

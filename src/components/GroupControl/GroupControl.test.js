import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import GroupControl from './GroupControl.js'
import WebMidiContext from '../../contexts/WebMidiContext.js'
import { bytesToHex } from '../../utils.js'

describe('GroupControl', () => {
	let container

	const sliderConfig = {
		name: 'Test controls',
		controls: [
			{
				label: 'Test 1',
				address: [0xa0, 0x7f],
				type: 'range',
				range: [0, 127],
			},
			{
				label: 'Test 2',
				address: [0xb1, 0x6e],
				type: 'range',
				range: [0, 127],
			},
		],
	}

	const sendSysexMessage = jest.fn()

	const provider = {
		midiInitialised: true,
		currentOutput: true,
		sendSysexMessage,
	}

	beforeEach(() => {
		act(() => {
			;({ container } = render(
				<WebMidiContext.Provider value={provider}>
					<GroupControl sliderConfig={sliderConfig} />
				</WebMidiContext.Provider>
			))
		})
	})

	afterEach(() => {
		container = null
	})

	it('renders sliders for each control', () => {
		expect(container.querySelectorAll('input[type="range"]')).toHaveLength(2)
	})

	it('renders the label for each control', () => {
		sliderConfig.controls.forEach((control) => {
			const label = screen.getByText(control.label)
			expect(label).not.toBe(null)
		})
	})

	it('sets the id correctly for each one', () => {
		sliderConfig.controls.forEach((control) => {
			const id = bytesToHex(control.address).replace(/,/g, '_')
			const slider = container.querySelector(`#control_${id}`)
			expect(slider).not.toBe(null)
		})
	})

	it('calls the send function if a control is changed	', () => {
		const input = container.querySelector('input[type="range"]')
		const value = '20'
		fireEvent.change(input, { target: { value: value } })
		expect(sendSysexMessage).toHaveBeenCalledWith(
			sliderConfig.controls[0].address,
			value
		)
	})

	describe('Rendering when things are not ready', () => {
		it('disabled sliders if not initialised', () => {
			provider.midiInitialised = false
			act(() => {
				;({ container } = render(
					<WebMidiContext.Provider value={provider}>
						<GroupControl sliderConfig={sliderConfig} />
					</WebMidiContext.Provider>
				))
			})
			expect(
				container.querySelectorAll('input[type="range"]:disabled')
			).toHaveLength(2)
		})

		it('disabled sliders currentOutput is not set', () => {
			provider.currentOutput = null
			act(() => {
				;({ container } = render(
					<WebMidiContext.Provider value={provider}>
						<GroupControl sliderConfig={sliderConfig} />
					</WebMidiContext.Provider>
				))
			})
			expect(
				container.querySelectorAll('input[type="range"]:disabled')
			).toHaveLength(2)
		})
	})
})

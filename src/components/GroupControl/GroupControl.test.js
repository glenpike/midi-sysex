import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, fireEvent, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import GroupControl from './GroupControl.js'
import WebMidiContext from '../../contexts/WebMidiContext.js'
import { bytesToHex } from '../../utils.js'

describe('GroupControl', () => {
	const controls = [
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
	]

	const sliderConfig = {
		name: 'Test controls',
		controls,
	}

	const sendSysexMessage = jest.fn()

	const provider = {
		midiInitialised: true,
		currentOutput: true,
		sendSysexMessage,
	}

	beforeEach(() => {
		render(
			<WebMidiContext.Provider value={provider}>
				<GroupControl sliderConfig={sliderConfig} />
			</WebMidiContext.Provider>
		)
	})

	afterEach(() => {
		cleanup()
	})

	it('renders sliders for each control', () => {
		controls.forEach((control) => {
			expect(screen.getByLabelText(new RegExp(control.label))).toBeTruthy()
		})
	})

	it('sets the id correctly for each one', () => {
		sliderConfig.controls.forEach((control) => {
			const id = bytesToHex(control.address).replace(/,/g, '_')
			const slider = screen.getByLabelText(new RegExp(control.label))
			expect(slider.id).toBe(`control_${id}`)
		})
	})

	it('calls the send function if a control is changed	', () => {
		const slider = screen.getByLabelText(new RegExp(controls[0].label))
		const value = '20'
		fireEvent.change(slider, { target: { value: value } })
		expect(sendSysexMessage).toHaveBeenCalledWith(
			controls[0].address,
			value
		)
	})

	describe('When midi is not initialised', () => {
		beforeAll(() => {
			provider.midiInitialised = false
		})
		afterAll(() => {
			provider.midiInitialised = true
		})
		it('disables sliders', () => {
			controls.forEach((control) => {
				expect(screen.getByLabelText(new RegExp(control.label))).toBeDisabled()
			})
		})
	})

	describe('When midi is not selected', () => {
		let originalOutput = provider.currentOutput
		beforeAll(() => {
			provider.currentOutput = null
		})
		afterAll(() => {
			provider.currentOutput = originalOutput
		})

		it('disables sliders', () => {
			controls.forEach((control) => {
				expect(screen.getByLabelText(new RegExp(control.label))).toBeDisabled()
			})
		})
	})
})

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Wrapper from './wrapper.js'
import webmidi from 'webmidi'
import WebMidiContext from './contexts/WebMidiContext.js'

const sendSysexMessage = jest.fn()
const midiOutputs = [{name: 'One'}, {name: 'Two'}]

	const provider = {
		midiInitialised: true,
		midiOutputs,
		currentOutput: midiOutputs[0],
		initialise: jest.fn(),
		sendSysexMessage,
		setCurrentOutput: jest.fn(),
		getCurrentOutput: jest.fn().mockImplementation(() => midiOutputs[0])
	}

	const renderWithConfig = () => render(
			<WebMidiContext.Provider value={provider}>
				<Wrapper />
			</WebMidiContext.Provider>
		)

describe('Wrapper', () => {
	it('just works', () => {
		renderWithConfig()
		screen.debug()
	})
})

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './app.js'

describe('App', () => {
	it.only('just works', () => {
		console.log('app test')
		render(<App />)
		screen.debug()
	})
})

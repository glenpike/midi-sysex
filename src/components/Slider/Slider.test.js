import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import Slider from './Slider'

const handler = jest.fn()

describe('Slider', () => {
	const defaultProps = {
		id: 'test-id',
		name: 'test-name',
		label: 'test-label',
		range: [0, 100],
		address: 'abc123',
		changeHandler: handler,
		disabled: false,
	}

	afterEach(() => {
		handler.mockReset
	})

	const getSlider = (props = defaultProps) => {
		render(<Slider {...props} />)
		return screen.getByLabelText(new RegExp(defaultProps.label))
	}

	it('renders', () => {
		expect(getSlider()).toBeTruthy()
	})

	it('sets a default value', () => {
		expect(getSlider().value).toBe('0')
	})

	it('I can set a value', () => {
		const testProps = { ...defaultProps, value: 20 }
		expect(getSlider(testProps).value).toBe('20')
	})

	it('it sets min and max values', () => {
		const slider = getSlider()

		expect(slider.min).toBe(`${defaultProps.range[0]}`)
		expect(slider.max).toBe(`${defaultProps.range[1]}`)
	})

	it('calls the handler with the right value	', () => {
		const slider = getSlider()
		const value = '20'
		fireEvent.change(slider, { target: { value: value } })
		expect(handler).toHaveBeenCalledWith(defaultProps.address, value)
	})
})

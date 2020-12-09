import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '@testing-library/react'

import Slider from './Slider'

const handler = jest.fn()

describe('Slider', () => {
	let container

	const props = {
		id: 'test-id',
		name: 'test-name',
		label: 'test-label',
		range: [0, 100],
		address: 'abc123',
		changeHandler: handler,
		disabled: false,
	}

	beforeEach(() => {
		act(() => {
			;({ container } = render(<Slider {...props} />))
		})
	})

	afterEach(() => {
		container = null
		handler.mockReset
	})

	it('renders the with the correct label', () => {
		expect(container.querySelector('label').textContent).toBe(props.label)
	})

	it('sets a default value', () => {
		expect(container.querySelector('input').value).toBe('0')
	})

	it('I can set a value', () => {
		const testProps = { ...props, value: 20 }
		act(() => {
			;({ container } = render(<Slider {...testProps} />))
		})
		expect(container.querySelector('input').value).toBe('20')
	})

	it('it sets min and max values', () => {
		expect(container.querySelector('input').min).toBe(`${props.range[0]}`)
		expect(container.querySelector('input').max).toBe(`${props.range[1]}`)
	})

	it('calls the handler with the right value	', () => {
		const input = container.querySelector('input')
		const value = '20'
		fireEvent.change(input, { target: { value: value } })
		expect(handler).toHaveBeenCalledWith(props.address, value)
	})
})

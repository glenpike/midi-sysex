import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import RadioOptions from './RadioOptions'

const handler = jest.fn()

describe('RadioOptions', () => {
	let container

	const props = {
		id: 'test-id',
		name: 'test-name',
		label: 'test-label',
		range: ['One', 'Two', 'Four', 'Eight', 'Sixteen'],
		address: 'abc123',
		changeHandler: handler,
		disabled: false,
	}

	beforeEach(() => {
		render(<RadioOptions {...props} />)
	})

	afterEach(() => {
		cleanup()
		handler.mockReset
	})

	it('renders the with the correct label', () => {
		expect(screen.getByText(new RegExp(props.label))).toBeTruthy()
	})

	it('renders a radio for each item in the range', () => {
		props.range.forEach((option) => {
			expect(screen.getByLabelText(option)).not.toBe(null)
		})
	})

	it('sets a default selection if no value is set in props', () => {
		const radio = screen.getByLabelText(props.range[0])
		expect(radio.value).toBe('0')
		expect(radio).toBeChecked()
	})

	it('I can set a value', async () => {
		cleanup()
		const testProps = { ...props, value: props.range[2] }
		render(<RadioOptions {...testProps} />)
		const radio = screen.getByLabelText(props.range[2])
		expect(radio.value).toBe('2')
		expect(radio).toBeChecked()
	})


	it.skip('calls the handler with the right value	', () => {
		const index = 3
		const value = props.range[index]
		const input = screen.getByLabelText(new RegExp(value))
		console.log('value: ', value, 'input: ', input.value)
		fireEvent.change(input, { target: { value }})
		screen.debug()
		expect(handler).toHaveBeenCalledWith(props.address, index)
	})
})

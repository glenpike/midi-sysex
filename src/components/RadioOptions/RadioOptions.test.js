import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '@testing-library/react'
import { screen } from '@testing-library/dom'

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
		act(() => {
			;({ container } = render(<RadioOptions {...props} />))
		})
	})

	afterEach(() => {
		container = null
		handler.mockReset
	})

	it('renders the with the correct label', () => {
		expect(container.querySelector('.options-control__label').textContent).toBe(props.label)
	})

	it('renders a radio for each item in the range', () => {
		props.range.forEach((option) => {
			expect(screen.getByLabelText(option)).not.toBe(null)
		})
	})

	it('sets a default value', () => {
		const expectedValue = props.range[0]
		expect(container.querySelector('input:checked').value).toBe(expectedValue)
	})

	it('I can set a value', () => {
		const testProps = { ...props, value: props.range[2] }
		act(() => {
			;({ container } = render(<RadioOptions {...testProps} />))
		})
		expect(container.querySelector('input:checked').value).toBe(props.range[2])
	})


	it('calls the handler with the right value	', () => {
		const index = 3
		const value = props.range[index]
		const input = screen.getByLabelText(new RegExp(value))
		console.log('value: ', value, 'input: ', input.value)
		fireEvent.change(input, { target: { value }})
		screen.debug()
		expect(handler).toHaveBeenCalledWith(props.address, value)
	})
})

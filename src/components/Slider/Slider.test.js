import React from "react";
// import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
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
		disabled: false 
	}

	beforeEach(() => {
	});

	afterEach(() => {
		container = null
		handler.mockReset
	});

	it('renders the with the correct label', () => {
		act(() => {
			({container} = render(<Slider {...props}/>));
		});
		expect(container.querySelector("label").textContent).toBe(props.label)
	})

	it('sets a default value', () => {
		act(() => {
			({container} = render(<Slider {...props}/>));
		});
		const expectedValue = `${(props.range[1] - props.range[0]) / 2}`
		expect(container.querySelector("input").value).toBe(expectedValue)
	})

	it('I can set a value', () => {
		const testProps = {...props, value: 20}
		act(() => {
			({container} = render(<Slider {...testProps}/>));
		});
		expect(container.querySelector("input").value).toBe("20")
	})

	it('it sets min and max values', () => {
		act(() => {
			({container} = render(<Slider {...props}/>));
		});
		expect(container.querySelector("input").min).toBe(`${props.range[0]}`)
		expect(container.querySelector("input").max).toBe(`${props.range[1]}`)
	})

	it('calls the handler with the right value	', () => {
		act(() => {
			({container} = render(<Slider {...props}/>));
		});
		const input = container.querySelector("input")
		const value = '20'
		fireEvent.change(input, { target: { value: value } })
		expect(handler).toHaveBeenCalledWith(props.address, value)
	})
})

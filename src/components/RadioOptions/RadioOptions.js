import React, { useState } from 'react'

import './RadioOptions.scss'

const RadioOptions = ({
	id,
	name,
	label,
	range,
	address,
	value,
	changeHandler,
	disabled,
}) => {

	let selectedValue = range.indexOf(value)
	if(selectedValue === -1){
		selectedValue = 0
	}
	const [radioValue, setRadioValue] = useState(selectedValue)

	const handleRadioOptionsChange = (event) => {
		console.log('handleRadioOptionsChange ', event.target.value)
		const index = +event.target.value
		changeHandler(address, index)
		setRadioValue(index)
	}

	console.log(`selectedValue ${selectedValue}, ${value}, ${range}`)

	return (
		<div className="options-control">
			<div className="options-control__controls">
				{range.map((option, index) => {
					const optionId = `${id}_${index}`
					return (
						<div key={optionId} className="options-control__radio-group">
							<input 
								id={optionId}
								name={name}
								type="radio"
								value={index}
								checked={index == radioValue}
								onChange={handleRadioOptionsChange}
								disabled={disabled}/>
							<label htmlFor={optionId}>{option}</label>
						</div>
					)
				})}
			</div>
			<span className="options-control__label">{label}</span>
		</div>
	)
}

export default RadioOptions

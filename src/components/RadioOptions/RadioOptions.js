import React from 'react'

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
	const handleRadioOptionsChange = (event) => {
		console.log('handleRadioOptionsChange ', event.target.value)
		changeHandler(address, event.target.value)
	}

	const selectedValue = value || range[0]

	return (
		<div className="options-control">
			<span className="options-control__label">{label}</span>
			{range.map((option, index) => {
				const optionId = `${id}_${index}`
				return (
					<div key={optionId} className="options-control__radio-group">
						<input 
							id={optionId}
							name={name}
							type="radio"
							value={option}
							checked={option == selectedValue}
							onChange={handleRadioOptionsChange}
							disabled={disabled}/>
						<label htmlFor={optionId}>{option}</label>
					</div>
				)
			})}
		</div>
	)
}

export default RadioOptions

import React, { useState } from 'react'

import './Slider.scss'

const Slider = ({
	id,
	name,
	label,
	range,
	address,
	value,
	changeHandler,
	disabled,
}) => {

	const [sliderValue, setSliderValue] = useState(value || 0)

	const handleSliderChange = (event) => {
		changeHandler(address, event.target.value)
		setSliderValue(event.target.value)
	}

	return (
		<div className="slider-control">
			<input
				className="slider-control__range"
				type="range"
				id={id}
				onChange={handleSliderChange}
				name={name}
				value={sliderValue}
				min={range[0]}
				max={range[1]}
				disabled={disabled}
			/>
			<label htmlFor={id}><strong>{label}</strong> {sliderValue}</label>
		</div>
	)
}

export default Slider

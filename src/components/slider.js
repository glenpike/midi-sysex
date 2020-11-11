import React from 'react';

const Slider = ({ id, name, label, range, address, changeHandler, disabled}) => {

	const handleSliderChange = (event) => {
		changeHandler(address, event.target.value)
	}

	return (
		<div className="slider-control">
			<input type="range" id={id} onChange={handleSliderChange} name={name} min={range[0]} max={range[1]} disabled={disabled} />
			<label htmlFor={id}>{label}</label>
		</div>
	)
}

export default Slider

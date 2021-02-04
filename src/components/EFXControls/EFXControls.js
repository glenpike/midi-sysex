import React, { useContext, useState } from 'react'
import WebMidiContext from '../../contexts/WebMidiContext.js'

import { bytesToHex } from '../../utils.js'

import GroupControl from '../GroupControl/GroupControl.js'
import RadioOptions from '../RadioOptions/RadioOptions.js'
import './EFXControls.scss'

const EFXControls = ({ efxConfig }) => {
	const { midiInitialised, currentOutput, sendSysexMessage } = useContext(
		WebMidiContext
	)

	const { efxTypeSelect, name, paramStartAddress, efxTypes } = efxConfig
	
	let selectedValue = efxTypeSelect.range.indexOf(efxTypeSelect.value)
	if(selectedValue === -1){
		selectedValue = 0
	}

	const [currentEfxType, chooseEfxType] = useState(selectedValue)

	const changeHandler = (address, value) => {
		sendSysexMessage(address, value)
		//We may need to send the starting params for the chosen EFX type?
		chooseEfxType(value)
	}
	
	const efxTypeControl = {
		id: `control_${bytesToHex(efxTypeSelect.address).replace(/,/g, '_')}`,
		disabled: !(midiInitialised && currentOutput),
		changeHandler,
		...efxTypeSelect 
	}

	
	const { name: efxName , controls } = efxTypes[currentEfxType]
	const efxControl = { name: efxName }
	efxControl.controls = controls.map((control, index) => {
		const address = [0x00, +paramStartAddress + index]
		// console.log(`address: ${address} for ${control.label}`)
		return { address, ...control }
	})

	return (
		<fieldset className="efx-controls group-control">
			<legend>{name}</legend>
			<RadioOptions {...efxTypeControl}/>
			<GroupControl sliderConfig={efxControl} />
		</fieldset>
	)
}

export default EFXControls

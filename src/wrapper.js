import React from 'react'
import MidiSelect from './components/MidiSelect/MidiSelect.js'
import GroupControl from './components/GroupControl/GroupControl.js'
import { controlConfig, efxConfig } from './controls.js'
import EFXControls from './components/EFXControls/EFXControls.js'

const Wrapper = () => {
	return(
		<React.Fragment>
			<div className="control__bar">
				<h1 className="control__heading"> Midi Sysex Controls </h1>
				<MidiSelect />
			</div>
			
			<div className="control__layout">
				{ controlConfig.map((control, index) =>
					<GroupControl key={index} sliderConfig={control} />
				)}
				<EFXControls efxConfig={efxConfig} />
			</div>
		</React.Fragment>
	)
}

export default Wrapper

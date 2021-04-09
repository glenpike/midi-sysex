import React, { Component } from 'react'
import { WebMidiContextProvider } from './contexts/WebMidiContext.js'
import "./app.scss";

import MidiSelect from './components/MidiSelect/MidiSelect.js'
import GroupControl from './components/GroupControl/GroupControl.js'
import { controlConfig, efxConfig } from './controls.js'
import EFXControls from './components/EFXControls/EFXControls.js'

// class App extends Component {
const App = () => {
	
		console.log('App')
	
		return (
			<WebMidiContextProvider>
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
			</WebMidiContextProvider>
		)
	}
// }

export default App

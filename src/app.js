import React, { Component } from 'react'
import MidiSelect from './components/MidiSelect/MidiSelect.js'
import GroupControl from './components/GroupControl/GroupControl.js'
import { WebMidiContextProvider } from './contexts/WebMidiContext.js'
import { controlConfig, efxConfig } from './controls.js'
import "./app.scss";
import EFXControls from './components/EFXControls/EFXControls.js'

class App extends Component {
	render() {
		return (
			<WebMidiContextProvider>
				<div className="App">
					<div className="control__bar">
						<h1 className="control__heading"> Midi Sysex Controls </h1>
						<MidiSelect />
					</div>
					
					<div className="control__layout">
						{ controlConfig.map((control) =>
							<GroupControl sliderConfig={control} />
						)}
						<EFXControls efxConfig={efxConfig} />
					</div>
				</div>
			</WebMidiContextProvider>
		)
	}
}

export default App

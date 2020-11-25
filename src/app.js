import React, { Component } from "react";
import MidiSelect from "./components/MidiSelect/MidiSelect.js";
import ReverbControl from "./components/ReverbControl/ReverbControl.js";
import { WebMidiContextProvider } from "./contexts/WebMidiContext.js"
import { reverbControls } from './controls.js'
// import "./App.css";

class App extends Component {
	render(){
		return(
			<WebMidiContextProvider>
				<div className="App">
					<div className="control-bar">
						<MidiSelect/>
					</div>
					<h1> Midi Sysex Controls </h1>
					<ReverbControl sliderConfig={reverbControls}/>
				</div>
			</WebMidiContextProvider>
		);
	}
}

export default App;

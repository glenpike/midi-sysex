import React, { Component } from "react";
import MidiSelect from "./components/midi-select.js";
import ReverbControl from "./components/reverb-control.js";
import { WebMidiContextProvider } from "./webmidi-context.js"
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
					<ReverbControl/>
				</div>
			</WebMidiContextProvider>
		);
	}
}

export default App;

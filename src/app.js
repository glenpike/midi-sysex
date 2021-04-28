import React from 'react'
import { WebMidiContextProvider } from './contexts/WebMidiContext.js'
import "./app.scss";

import Wrapper from './wrapper.js';

const App = () => {
		return (
			<WebMidiContextProvider>
				<Wrapper/>
			</WebMidiContextProvider>
		)
	}

export default App

import React, { useContext } from 'react'
import WebMidiContext from '../../contexts/WebMidiContext.js'
import { bytesToHex } from '../../utils.js'

import './MessageDisplay.scss'

const MessageDisplay = () => {
	const {
		lastSysexMessage,
	} = useContext(WebMidiContext)

	const { manufacturer = '', data = [] } = lastSysexMessage || {}

	const messageStr = () => {
		if(0 == data.length) {
			return ''
		}

		return `f0,${bytesToHex([manufacturer])},${bytesToHex(data)},f7`
	}

	return (
		<fieldset className="group-control">
			<legend>Debug</legend>
			<div className="message-display">
				<textarea 
					className="message-display__textarea"
					id="message-display-output"
					rows="4"
					defaultValue={messageStr()}
				/>
				<label className="message-display__label" htmlFor="message-display-output">
					<strong>Last Sysex Message</strong>
				</label>
			</div>
		</fieldset>
	)
}

export default MessageDisplay

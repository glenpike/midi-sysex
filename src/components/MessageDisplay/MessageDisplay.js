import React, { useContext, useState } from 'react'
import WebMidiContext from '../../contexts/WebMidiContext.js'
import { bytesToHex } from '../../utils.js'

import './MessageDisplay.scss'

const MessageDisplay = () => {
	const {
		lastSysexMessage,
	} = useContext(WebMidiContext)

	const audioRef = React.createRef()
	const videoRef = React.createRef()

	const { manufacturer = '', data = [] } = lastSysexMessage || {}

	const messageStr = () => {
		if(0 == data.length) {
			return ''
		}

		return `f0,${bytesToHex([manufacturer])},${bytesToHex(data)},f7`
	}
	const videoButtonClick = () => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			console.log('getUserMedia supported.');
			navigator.mediaDevices.getUserMedia ({ video: { deviceId: 'a28e1d780312a107470fcde3e9bdeb5faf083d2537765036b643f356ebded112' } })
				.then(function(stream) {
					if(videoRef.current.srcObject !== stream) {
						videoRef.current.srcObject = stream
						videoRef.current.onloadedmetadata = function(e) {
							videoRef.current.play();
						};
					}
				})
	 
				 // Error callback
				 .catch(function(err) {
						console.log('The following getUserMedia error occurred: ' + err);
				 }
			);
	 } else {
			console.log('getUserMedia not supported on your browser!');
	 }
	}
	const audioButtonClick = () => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			console.log('getUserMedia supported.');
			navigator.mediaDevices.getUserMedia ({ audio: true })
				.then(function(stream) {
					if(audioRef.current.srcObject !== stream) {
						audioRef.current.srcObject = stream
						audioRef.current.onloadedmetadata = function(e) {
							audioRef.current.play();
						};
					}
				})
	 
				 // Error callback
				 .catch(function(err) {
						console.log('The following getUserMedia error occurred: ' + err);
				 }
			);
	 } else {
			console.log('getUserMedia not supported on your browser!');
	 }
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
			<button onClick={audioButtonClick}>Monitor Audio</button>
			<button onClick={videoButtonClick}>Webcam 2</button>
			<audio ref={audioRef} autoPlay />
			<div className="message-display__video-crop-lcd">
				<img className="message-display__video-lcd" src="http://192.168.1.97:8080/video" width="430" height="241"></img>
			</div>
			<div className="message-display__video-crop-webcam">
				<video className="message-display__video-webcam" ref={videoRef} autoPlay />
			</div>
		</fieldset>
	)
}

export default MessageDisplay

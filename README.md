Sending MIDI System Exclusive (SysEx) messages from my browser to instruments

Based on [JavaScript starter](https://github.com/glenpike/javascript-starter) project.

Adds:

- [WebMidi](https://github.com/djipco/webmidi) js library because I'm too impatient to be messing around with low-level stuff.
- [Lodash](https://lodash.com/) for the [template](https://lodash.com/docs/4.17.15#template) function

# Currently

Wiring up [control definitions](./src/controls.js) to generate html [elements](./src/elements.js) that can be used to send [System Exclusive](https://www.midi.org/specifications-old/item/table-4-universal-system-exclusive-messages) messages.

So I can setup various params for FX, etc, then extract the SysEx Hex string to paste into sequencer Midi Events, etc.

Currently coding to control a [Roland MC-505](https://en.wikipedia.org/wiki/Roland_MC-505) 'Groovebox'

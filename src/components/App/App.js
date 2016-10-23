import React, { Component } from 'react'

import {Tracker, Player, Controls, Timecode, Indicator, Track, Keyframe} from '../Tracker/Tracker'

import './App.scss'

class App extends Component {
  render() {
    return (
      <Tracker>
        <Player>
          <Controls/>

          <Timecode>
            <Indicator/>
          </Timecode>
        </Player>


        <Track title="Track 1">
          <Keyframe></Keyframe>
        </Track>
      </Tracker>
    );
  }
}

export default App

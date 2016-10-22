import React, { Component } from 'react'

import {Tracker, Timeline, Indicator, Track, Keyframe} from '../Tracker/Tracker'

import './App.scss'

class App extends Component {
  render() {
    return (
      <Tracker>
        <Timeline>
          <Indicator>

          </Indicator>
        </Timeline>

        <Track>
          <Keyframe>

          </Keyframe>
        </Track>
      </Tracker>
    );
  }
}

export default App

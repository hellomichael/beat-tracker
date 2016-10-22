import React, { Component } from 'react'
import Tracker from '../Tracker/Tracker'
import Timeline from '../Tracker/Timeline/Timeline'
import Indicator from '../Tracker/Indicator/Indicator'
import Track from '../Tracker/Track/Track'
import Keyframe from '../Tracker/Keyframe/Keyframe'

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

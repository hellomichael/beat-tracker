import React, { Component } from 'react';

import Player from './Player/Player'
import Controls from './Controls/Controls'
import Timecode from './Timecode/Timecode'
import Indicator from './Indicator/Indicator'
import Track from './Track/Track'
import Keyframe from './Keyframe/Keyframe'
import './Tracker.scss'

class Tracker extends Component {
  render() {
    return (
      <div className="tracker">
        <div className="tracker__video"></div>
        {this.props.children}
      </div>
    )
  }
}

export {Tracker, Player, Controls, Timecode, Indicator, Track, Keyframe}

import React, { Component } from 'react';

import Preview from './Preview/Preview'
import Output from './Output/Output'
import Video from './Video/Video'

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
      <div className="tracker" onClick={this.props.onClick}>
        {this.props.children}
      </div>
    )
  }
}

export {Tracker, Preview, Output, Video, Player, Controls, Timecode, Indicator, Track, Keyframe}

import React, { Component } from 'react';

import Preview from './Preview'
import Output from './Output'
import Video from './Video'

import Player from './Player'
import Playlist from './Playlist'
import Timecode from './Timecode'
import Indicator from './Indicator'

import Track from './Track'
import Keyframe from './Keyframe'

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

export {Tracker, Preview, Output, Video, Player, Playlist, Timecode, Indicator, Track, Keyframe}

import React, { Component } from 'react';

import Timeline from './Timeline/Timeline'
import Indicator from './Indicator/Indicator'
import Track from './Track/Track'
import Keyframe from './Keyframe/Keyframe'

import './Tracker.scss';

class Tracker extends Component {
  render() {
    return (
      <div className="tracker">
        {this.props.children}
      </div>
    );
  }
}

export {Tracker, Timeline, Indicator, Track, Keyframe}

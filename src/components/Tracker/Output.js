import React, { Component } from 'react'
import * as Utils from '../App/Utils.js'

class Output extends Component {
  render() {
    let keyframes = this.props.keyframes.map((keyframe) => {
      return {
        'timecode': Utils.getTimecode(keyframe)
      }
    })

    let json = {
      'keyframes': keyframes
    }

    return (
      <pre className="tracker__preview__output">{`${JSON.stringify(json, undefined, 2)}`}</pre>
    );
  }
}

export default Output;

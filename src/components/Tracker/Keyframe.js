import React, { Component } from 'react';

class Keyframe extends Component {
  render() {
    let threshold = Math.abs(this.props.progress - this.props.seconds)

    return (
      <div className={(threshold < 0.15) ? 'tracker__track__keyframe tracker__track__keyframe--active' : 'tracker__track__keyframe'} style={{left: `${this.props.position}%`}}>
      </div>
    );
  }
}

export default Keyframe;

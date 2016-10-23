import React, { Component } from 'react';

class Keyframe extends Component {
  render() {
    return (
      <div className="tracker__track__keyframe" style={{left: `${this.props.progress}%`}}>
      </div>
    );
  }
}

export default Keyframe;

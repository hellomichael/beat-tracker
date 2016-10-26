import React, { Component } from 'react';
import classNames from 'classnames/bind';

class Keyframe extends Component {
  render() {
    let threshold = Math.abs(this.props.progress - this.props.seconds)
    let keyframeClassNames = classNames({
      'tracker__track__keyframe': true,
      'tracker__track__keyframe--selected': threshold < 0.15 || this.props.selected
    })

    return (
      <div
        onClick={this.props.onClick}
        className={keyframeClassNames}
        style={{left: `${this.props.position}%`}}>
      </div>
    );
  }
}

export default Keyframe;

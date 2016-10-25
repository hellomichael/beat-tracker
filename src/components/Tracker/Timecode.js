import React, { Component } from 'react';

class Timecode extends Component {
  render() {
    return (
      <div className="tracker__player__timecode">
        {this.props.children}
      </div>
    );
  }
}

export default Timecode;

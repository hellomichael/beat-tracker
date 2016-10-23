import React, { Component } from 'react';

class Controls extends Component {
  render() {
    return (
      <div className="tracker__player__controls">
        <div className="tracker__player__controls__stop"></div>
        <div className="tracker__player__controls__play"></div>
      </div>
    );
  }
}

export default Controls;

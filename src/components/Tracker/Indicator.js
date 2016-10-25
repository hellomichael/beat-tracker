import React, { Component } from 'react';

class Indicator extends Component {
  render() {
    return (
      <div className="tracker__player__indicator" style={{left: `${this.props.progress}%`}}>

      </div>
    );
  }
}

export default Indicator;

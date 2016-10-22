import React, { Component } from 'react';
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

export default Tracker;

import React, { Component } from 'react';

class Timeline extends Component {
  render() {
    return (
      <div className="tracker__timeline">
        {this.props.children}
      </div>
    );
  }
}

export default Timeline;

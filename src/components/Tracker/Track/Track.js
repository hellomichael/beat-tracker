import React, { Component } from 'react';

class Track extends Component {
  render() {
    return (
      <div className="tracker__track">
        {this.props.children}
      </div>
    );
  }
}

export default Track;

import React, { Component } from 'react';

class Player extends Component {
  render() {
    return (
      <div className="tracker__player">
        {this.props.children}
      </div>
    );
  }
}

export default Player;

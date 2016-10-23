import React, { Component } from 'react';

class Track extends Component {
  render() {
    return (
      <div className="tracker__track">
        <small className="tracker__track__title">{this.props.title}</small>

        <div className="tracker__track__timeline">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Track;

import React, { Component } from 'react';

class Track extends Component {
  render() {
    return (
      <a href="#" className="tracker__track">
        <small className="tracker__track__title">{this.props.title}</small>

        <div className="tracker__track__timeline">
          {this.props.children}
        </div>
      </a>
    );
  }
}

export default Track;

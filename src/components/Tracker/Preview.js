import React, { Component } from 'react';

class Preview extends Component {
  render() {
    return (
      <div className="tracker__preview">
        {this.props.children}
      </div>
    );
  }
}

export default Preview;

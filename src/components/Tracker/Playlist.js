import React, { Component } from 'react';
import _ from 'lodash'

class Playlist extends Component {
  state = {
    editing: false
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.target.blur()
    }
  }

  handleBlur(event) {
    let id = event.target.value

    if (id.length) {
      this.setState({editing: false})
      this.props.addTrack(event.target.value)
    }

    else {
      this.setState({editing: false})
      event.target.blur()
    }
  }

  handleEditing(event) {
    this.setState({editing: true})
  }

  render() {
    let inputTrack = this.state.editing ? <li><input type="text" autoFocus onBlur={this.handleBlur.bind(this)} onKeyDown={this.handleKeyPress.bind(this)}/></li> : null

    return (
      <ul className="tracker__player__playlist">
        {_.map(this.props.tracks, (track, key) => {
          return <li className={(key === this.props.activeTrack ? 'active' : null)} key={key} onClick={this.props.loadTrack.bind(this, key)}>{track.id}</li>
        })}

        {inputTrack}
        <li onClick={this.handleEditing.bind(this)}>Add Track +</li>
      </ul>
    )
  }
}

export default Playlist;

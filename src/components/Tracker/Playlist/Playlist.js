import React, { Component } from 'react';
import _ from 'lodash'

class Playlist extends Component {
  state = {
    editing: false
  }

  addTrack (id, keyframes) {
    this.setState({editing: false})
    event.target.blur()
    this.props.addTrack(id, keyframes)
  }

  handleKeyPress(event) {
    let id = event.target.value

    if (event.key === 'Enter' && id.length) {
      this.addTrack(event.target.value, [])
    }
  }

  handleBlur(event) {
    let id = event.target.value

    if (id.length) {
      this.addTrack(event.target.value, [])
    }
  }

  handleClick(event) {
    this.setState({editing: true})
  }

  render() {
    let inputTrack = this.state.editing ? <li><input type="text" autoFocus onBlur={this.handleBlur.bind(this)} onKeyDown={this.handleKeyPress.bind(this)}/></li> : null

    return (
      <ul className="tracker__player__playlist">
        {_.map(this.props.tracks, (track, index) => {
          return <li key={`track-${index}`}>{track.id}</li>
        })}

        {inputTrack}
        <li onClick={this.handleClick.bind(this)}>Add Track +</li>
      </ul>
    )
  }
}

export default Playlist;

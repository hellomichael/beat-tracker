import React, { Component } from 'react'
import Firebase from '../Firebase/Firebase'
import YouTube from 'youtube-player'
// import Query from 'query-string'
// import CreateHistory from 'history/createBrowserHistory'
import {Tracker, Preview, Output, Video, Player, Playlist, Timecode, Indicator, Track, Keyframe} from '../Tracker/Tracker'
import _ from 'lodash'
import * as Utils from './Utils.js'
import './App.scss'

let playlist = Firebase.ref('playlist')
// let history = CreateHistory()

class App extends Component {
  state = {
    currentTrack:           null,
    youtube:                null,
    currentTime:            null,
    duration:               null,
    progress:               null,
    timeout:                null,
    requestAnimationFrame:  null,
    playlist:               [],
    selectedKeyframes:      []
  }

  componentDidMount() {
    // Update state when firebase is updated
    playlist.on('value', snapshot => {
      console.log('Firebase: DB Updated')

      this.setState({
        playlist: snapshot.val()
      })
    })

    // Play the last video uploaded
    playlist.limitToLast(1).on('value', snapshot => {
      console.log('Firebase: DB New Item')
      if (snapshot.val()) {
        let key = Object.keys(snapshot.val())[0]

        if (key !== this.state.currentTrack) {
          this.loadTrack(key)
        }
      }
    })

    // Create youtube video
    this.setState({
      youtube: new YouTube(document.querySelector('.tracker__preview__video'), {
        height: '100%',
        width: '100%',
        videoId: '',
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
          rel: 0,
          showInfo: 0,
          iv_load_policy: 3,
        }
      })
    }, () => {
      this.state.youtube.on('stateChange', event => {
        // '-1': 'unstarted',
        // 0: 'ended',
        // 1: 'playing',
        // 2: 'paused',
        // 3: 'buffering',
        // 5: 'video cued'

        if (!event.data) {
          throw new Error('Unknown state (' + event.data + ').')
        }

        else if (event.data === 1) {
          console.log('State play')
          this.updateTrack()
        }

        else {
          console.log('State stop')
          this.stopTrack()
        }
      })
    })

    // Add keyframe listener
    document.addEventListener('keydown', this.handleKeyPress.bind(this))
  }

  addTrack(id) {
    // Add track to firebase
    playlist.push({
      id:         id
    })
  }

  loadTrack(key) {
    this.setState({
      currentTrack: key,
      selectedKeyframes: []
    }, () => {
      // Stop track
      this.stopTrack()

      //Load youtube video
      this.state.youtube.loadVideoById({
        'videoId': this.state.playlist[key].id,
        'suggestedQuality': 'small'
      })
    })
  }

  updateTrack() {
    // console.log('Update track')
    this.setState({
      timeout: setTimeout(() => {
        // Create request animation
        this.setState({
          requestAnimationFrame: requestAnimationFrame(this.updateTrack.bind(this))
        })

        // Update duration
        this.state.youtube.getDuration()
        .then(seconds => this.setState({duration: Utils.getTwoDecimalPlaces(seconds)}))

        // Set currentTime and progress
        this.state.youtube.getCurrentTime()
        .then(seconds => this.setState({
          currentTime: Utils.getTwoDecimalPlaces(seconds),
          progress: Utils.getTwoDecimalPlaces(this.state.currentTime/this.state.duration * 100)
        }))
      }, 1000/60)
    })
  }

  stopTrack() {
    console.log('Stop Track')
    cancelAnimationFrame(this.state.requestAnimationFrame)
    clearTimeout(this.state.timeout)
  }

  updateKeyframes () {
    let currentKeyframes = (this.state.playlist[this.state.currentTrack] && this.state.playlist[this.state.currentTrack].keyframes) ? this.state.playlist[this.state.currentTrack].keyframes : []
    let newKeyframes = _.sortBy(currentKeyframes.concat(this.state.currentTime))

    playlist.update({
      [`${this.state.currentTrack}/keyframes`] : newKeyframes
    })
  }

  deleteKeyframes() {
    console.log('Delete keyframes')

    let currentKeyframes = (this.state.playlist[this.state.currentTrack] && this.state.playlist[this.state.currentTrack].keyframes) ? this.state.playlist[this.state.currentTrack].keyframes : []
    let newKeyframes = [...currentKeyframes]

    // Remove selected keyframes
    this.state.selectedKeyframes.map((index) => {
      newKeyframes.splice(index, 1)
    })

    playlist.update({
      [`${this.state.currentTrack}/keyframes`] : newKeyframes
    })

    // Reset selected keyframes
    this.setState({
      selectedKeyframes: []
    })
  }

  handleSelectedKeyframe(keyframe, event) {
    console.log('Keyframe', keyframe)
    console.log('Keyframes', this.state.selectedKeyframes)

    // Deselect
    if (_.includes(this.state.selectedKeyframes, keyframe)) {
      console.log('Deselect')

      let selectedKeyframes = [...this.state.selectedKeyframes]
      selectedKeyframes.splice(_.indexOf(this.state.selectedKeyframes, keyframe), 1)

      this.setState({
        selectedKeyframes: selectedKeyframes
      })
    }

    // Select
    else {
      console.log('Select')

      this.setState({
        selectedKeyframes: this.state.selectedKeyframes.concat(keyframe)
      })
    }
  }

  handleKeyPress(event) {
    event.preventDefault()

    if (event.key === ' ' && this.state.currentTime) {
      this.updateKeyframes()
    }

    else if (event.key === 'Backspace') {
      this.deleteKeyframes()
    }
  }

  render() {
    let keyframes = (this.state.playlist[this.state.currentTrack] && this.state.playlist[this.state.currentTrack].keyframes) ? this.state.playlist[this.state.currentTrack].keyframes : []

    return (
      <Tracker>
        <Preview>
          <Output keyframes={keyframes}></Output>
          <Video></Video>
        </Preview>

        <Player>
          <Playlist
            tracks={this.state.playlist}
            activeTrack={this.state.currentTrack}
            loadTrack={this.loadTrack.bind(this)}
            addTrack={this.addTrack.bind(this)}
          />

          <Timecode>
            <Indicator
              progress={this.state.progress}
            />
          </Timecode>
        </Player>

        <Track>
          {keyframes.map((keyframe, index) => {
            let isSelected = _.includes(this.state.selectedKeyframes, index)

            return (
              <Keyframe
                key={`keyframe-${index}`}
                ref={`keyframe-${index}`}
                progress={this.state.currentTime}
                seconds={keyframe}
                position={(keyframe/this.state.duration * 100)}
                selected={isSelected}
                onClick={this.handleSelectedKeyframe.bind(this, index)}
              />
            )
          })}
        </Track>
      </Tracker>
    )
  }
}

export default App

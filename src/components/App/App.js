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
    keyframes:              []
  }

  componentDidMount() {
    // Update state when firebase is updated
    playlist.on('value', snapshot => {
      this.setState({
        playlist: snapshot.val()
      })
    })

    // Play the last video uploaded
    playlist.limitToLast(1).on('value', snapshot => {
      if (snapshot.val()) {
        let key = Object.keys(snapshot.val())[0]
        let keyframes = (snapshot.val()[key].keyframes) ? snapshot.val()[key].keyframes : []

        // New Track
        if (key !== this.state.currentTrack) {
          this.loadTrack(key, keyframes)
        }

        // New Keyframe
        else {
          this.setState({
            keyframes: keyframes
          })
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
          throw new Error('Unknown state (' + event.data + ').');
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
    document.addEventListener('keypress', this.handleKeyPress.bind(this));
  }

  addTrack(id, keyframes) {
    // Add track to firebase
    playlist.push({
      id:         id,
      keyframes:  keyframes
    })
  }

  loadTrack(key, keyframes) {
    this.setState({
      currentTrack: key,
      keyframes: keyframes
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
    console.log('Update track')
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
    let keyframes = _.sortBy(this.state.keyframes.concat(this.state.currentTime))

    playlist.update({
      [`${this.state.currentTrack}/keyframes`] : keyframes
    })
  }

  handleKeyPress(event) {
    event.preventDefault()

    if (event.key === ' ' && this.state.currentTime) {
      this.updateKeyframes()
    }
  }

  render() {
    return (
      <Tracker>
        <Preview>
          <Output keyframes={this.state.keyframes}></Output>
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
          {this.state.keyframes.map((keyframe, index) => {
            return (
              <Keyframe
                key={`keyframe-${index}`}
                progress={(keyframe/this.state.duration * 100)}
              />
            )
          })}
        </Track>
      </Tracker>
    )
  }
}

export default App

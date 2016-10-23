import React, { Component } from 'react'
import YouTube from 'youtube-player'
import {Tracker, Preview, Output, Video, Player, Controls, Timecode, Indicator, Track, Keyframe} from '../Tracker/Tracker'
import * as Utils from './Utils.js'
import './App.scss'

class App extends Component {
  state = {
    id:                     null,
    youtube:                null,
    currentTime:            null,
    duration:               null,
    progress:               null,
    timeout:                null,
    requestAnimationFrame:  null,
    keyframes:              []
  }

  componentDidMount() {
    this.loadVideo()
  }

  handleClick(event) {
    event.preventDefault()

    if (this.state.currentTime) {
      this.setState({keyframes:
        this.state.keyframes.concat(this.state.currentTime)
      })
    }

    console.log(this.state.keyframes)
  }

  loadVideo() {
    // Update states
    this.setState({
      youtube: new YouTube(document.querySelector('.tracker__preview__video'), {
        height: '100%',
        width: '100%',
        videoId: 'CDyrWWPt534',
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
          showInfo: 0,
          iv_load_policy: 3,
        }
      })
    })

    this.playVideo()
  }

  playVideo() {
    this.setState({
      timeout: setTimeout(() => {
        this.setState({
          requestAnimationFrame: requestAnimationFrame(this.playVideo.bind(this))
        })

        // Set currentTime, duration, and progress
        this.state.youtube.getCurrentTime()
        .then(seconds => this.setState({currentTime: Utils.getTwoDecimalPlaces(seconds)}))

        this.state.youtube.getDuration()
        .then(seconds => this.setState({duration: Utils.getTwoDecimalPlaces(seconds)}))

        this.setState({progress: Utils.getTwoDecimalPlaces(this.state.currentTime/this.state.duration * 100)})
      }, 1000/60)
    })
  }

  stopVideo() {
    cancelAnimationFrame(this.state.requestAnimationFrame)
    clearTimeout(this.state.timeout)
  }

  render() {
    return (
      <Tracker onClick={this.handleClick.bind(this)}>
        <Preview>
          <Output></Output>
          <Video></Video>
        </Preview>

        <Player>
          <Controls/>

          <Timecode>
            <Indicator progress={this.state.progress}/>
          </Timecode>
        </Player>

        <Track title="Track 1" >
          {this.state.keyframes.map(keyframe => {
            return (
              <Keyframe progress={(keyframe/this.state.duration * 100)}></Keyframe>
            )
          })}
        </Track>
      </Tracker>
    )
  }
}

export default App

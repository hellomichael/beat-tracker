import React, { Component } from 'react'
import YouTube from 'youtube-player'
import {Tracker, Player, Controls, Timecode, Indicator, Track, Keyframe} from '../Tracker/Tracker'
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
    // Update states
    this.setState({
      youtube: new YouTube(document.querySelector('.tracker__video'), {
        width: window.innerWidth - (86) - (window.innerWidth * 0.15),
        height: window.innerHeight/2,
        videoId: 'CDyrWWPt534',
        playerVars: {
          autoplay: 1,
          // controls: 0,
          modestbranding: 1,
          rel: 0,
          showInfo: 0,
          iv_load_policy: 3,
        }
      })
    })

    this.playVideo()
  }

  stopVideo () {
    cancelAnimationFrame(this.state.requestAnimationFrame)
    clearTimeout(this.state.timeout)
  }

  playVideo () {
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

  render() {
    return (
      <Tracker>
        <Player>
          <Controls/>

          <Timecode>
            <Indicator progress={this.state.progress}/>
          </Timecode>
        </Player>


        <Track title="Track 1">
          <Keyframe></Keyframe>
        </Track>
      </Tracker>
    );
  }
}

export default App

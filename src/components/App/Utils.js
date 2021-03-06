export function getSeconds(timecode) {
  let sec = timecode.split(':')
  let minutes = parseInt(sec[0], 10)
  let seconds = parseInt(sec[1], 10)
  let milliseconds = parseInt(sec[2], 10)
  return getTwoDecimalPlaces((minutes * 60) + (seconds) + (milliseconds/30))
}

export function getTwoDecimalPlaces(value) {
  return +(Math.round(value + "e+2")  + "e-2");
}

export function getTimecode(seconds) {
  let min = Math.floor(seconds / 60)
  let sec =  Math.floor(seconds - min * 60)
  let milli = Math.floor((seconds - Math.floor(seconds)) * 30)

  // Prefix w/ 0s
  if (min < 10) {
    min = '0' + min
  }

  if (sec < 10) {
    sec = '0' + sec
  }

  if (milli < 10) {
    milli = '0' + milli
  }

  return min + ':' + sec + ':' + milli
}

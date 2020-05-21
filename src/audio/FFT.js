import audio from "@/audio/Audio"

const FFTSize = 2**12 // *4
const smoothingTimeConstant = 0.85

const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
analyser.fftSize = FFTSize
analyser.smoothingTimeConstant = smoothingTimeConstant

let dataArray = new Uint8Array(analyser.frequencyBinCount);

const source = audioCtx.createMediaElementSource(audio.instance);
source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.getByteFrequencyData(dataArray);

export default {
  data: dataArray,
  fetchData: () => {
    analyser.getByteFrequencyData(dataArray)
    return dataArray
  },
  resume() {
    if(audioCtx.state !== 'running')
      return audioCtx.resume()
    return Promise.resolve(true)
  },
  audioCtx,
  analyser
}

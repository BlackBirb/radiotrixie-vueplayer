const instance = new Audio()
instance.crossOrigin = "anonymous";
instance.controls = false;
instance.loop = false;
instance.autoplay = false;
instance.volume = 0

export default {
  instance,
  hasSource() {
    return instance.src !== ''
  },
  resetAudioSource() {
    instance.src = ''
  }
}
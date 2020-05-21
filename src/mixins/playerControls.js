import { mapState } from 'vuex'
import AudioPlayer from '@/audio/Audio'
import FFT from '@/audio/FFT'

export default {
  computed: mapState({
    _playing: 'playing',
    _volume: 'volume'
  }),
  mounted() {
    AudioPlayer.instance.volume = this.$store.state.volume / 100
  },
  watch: {
    _volume(val) {
      AudioPlayer.instance.volume = val / 100
    },
    _playing(val) {
      if(val) {
        this.$store.commit('loading', true)

        if(!this.__pcValidateSource()) return

        FFT.resume()
          .then(() => AudioPlayer.instance.play())
          .then(() => {
            this.$store.commit('loading', false)
          })
          .catch(err => {
            console.error(err)
            this.$store.commit('loading', false)
            this.$store.commit('playing', false)
          })
      } else {
        AudioPlayer.instance.pause()
        this.__pcRemoveSource()
      }
    }
  },
  methods: {
    __pcValidateSource() {
      // if(!AudioPlayer.hasSource()) {
        if(!this.$store.state.options.audioSrc) {
          this.$store.commit('loading', false)
          this.$store.commit('playing', false)
          console.error(new Error('Audio has no valid source'))
          return null
        }
        AudioPlayer.instance.src = this.$store.state.options.audioSrc
      // }
      return true
    },
    __pcRemoveSource() {
      AudioPlayer.resetAudioSource()
    }
  }
}
<template>
  <div class="info-panel">
    <div class="info-text-wrapper" @click="moveSlide">
      <div class="slide-wrapper">
        <transition name="slide">
          <div class="info-content" :key="slide">
            <span>{{ slide }}</span>
          </div>
        </transition>
      </div>
    </div>
    <!-- icons for social + thumbs/stars<br>
    Use activity + add inline styles<br>
    Expand button to expand into history<br>
    equalizer + option to toggle it off -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      timeout: 0,
      activeSlide: 0
    }
  },
  mounted () {
    this.queueChange()
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  },
  methods: {
    moveSlide () {
      this.activeSlide = (this.activeSlide + 1) % this.slides.length
      // this.$store.commit('activeSlide', (this.activeSlide + 1) % this.slides.length)
      this.queueChange()
    },
    queueChange () {
      clearTimeout(this.timeout)
      const speed = this.$store.state.options.sliderSpeed
      this.timeout = setTimeout(this.moveSlide, this.activeSlide < 1 ? speed*3 : speed)
    }
  },
  computed: {
    ...mapState({
      title: state => state.activeTrack.title,
      author: state => state.activeTrack.author,
      loading: 'loading'
    }),
    trackName () {
      let name = ''
      if (this.author) 
        name += this.author + (this.title ? ' - ' : '')
      if(this.title)
        name += this.title
      return name
    },
    slides () {
      if(this.loading) 
        return [ 'Loading...' ]
      return [
        this.trackName,
        ...this.$store.state.options.slides
      ]
    },
    slide () {
      return this.slides[this.activeSlide % this.slides.length]
    }
  }
}
</script>

<style lang="scss">
#app.BlackPlayer {
  & .info-panel {
      padding: 2px 0;
    & .slide-wrapper {
      overflow: hidden;
      position: relative;
      height: 18px;

      & .info-content {
        position: absolute;
        top: 0;
        left: 0;
      }

      & .slide-enter-active, 
      & .slide-leave-active {
        transition: all .68s cubic-bezier(0.25, 0.1, 0.25, 1);
      }
      & .slide-enter, 
      & .slide-leave-active {
        opacity: 0;
      }
      & .slide-enter {
        transform: translateY(18px);
      }
      & .slide-leave-active {
        transform: translateY(-18px);
      }

    }
  }

}
</style>
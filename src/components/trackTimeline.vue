<template>
  <div v-if="track.duration && track.beginAt" class="track-dutaion">
    <div class="slider-bar">
      <div class="slider-inner" :style="{ width: width+'%' }">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      width: 0
    }
  },
  mounted() {
    this.updateWidth()
  },
  computed: {
    ...mapState({
      track: 'activeTrack'
    })
  },
  methods: {
    updateWidth () {
      const { beginAt, duration } = this.track
      const timePassed = Date.now() - beginAt
      requestAnimationFrame(() => this.updateWidth())
      this.width = Math.min(Math.max(100 / (duration * 1000) * timePassed, 0), 100)
    }
  }
}
</script>

<style lang="scss">
#app.BlackPlayer {
  & .track-dutaion {
    position: absolute;
    width: 100%;
    top: -2px;
    left: 0;
    height: 2px;
    overflow: hidden;

    & .slider-bar {
      width: 100%;
      height: 100%;
      background: #15191d;
    }
    & .slider-inner {
      height: 100%;
      background: #3bc753;
    }
  }
}
</style>
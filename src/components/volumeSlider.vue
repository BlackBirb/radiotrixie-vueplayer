<template>
  <div class="volume-slider player-panel panel-row" @mousewheel="scroll">
    <div @click="toggleMute" class="player-panel inline-panel mute-button hoverable">
      <svg v-if="volume > 50" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-up" class="svg-inline--fa fa-volume-up fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"></path></svg>
      <svg v-else-if="volume > 0" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-down" class="svg-inline--fa fa-volume-down fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M215.03 72.04L126.06 161H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V89.02c0-21.47-25.96-31.98-40.97-16.98zm123.2 108.08c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 229.28 336 242.62 336 257c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.87z"></path></svg>
      <svg v-else aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-mute" class="svg-inline--fa fa-volume-mute fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"></path></svg>
    </div>
    <div @mousedown="mousedown" class="player-panel grow-panel" style="padding: 6px 0px">
      <div class="volume-slider-bar" ref="bar">
        <div :class="{ 'volume-slider-inner': true, 'finish-animation': addAnimation }" :style="{ width: volume+'%' }">
        </div>
      </div>
    </div>
    <div class="player-panel inline-panel text-right" style="flex-basis: 32px"> {{ Math.round(volume) }}% </div>
    <!-- <input type="checkbox" :checked="dragging">
    {{ vol }}
    {{ volume }} -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      dragging: false,
      vol: 50,
      addAnimation: false
    }
  },
  computed: mapState([ 'volume' ]),
  mounted() {
    window.addEventListener('mousemove', this.calcVolume)
    window.addEventListener('mouseup', this.drop)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.calcVolume)
    window.removeEventListener('mouseup', this.drop)
  },
  methods: {
    mousedown ($evn) {
      if($evn.which === 1) {
        this.vol = $evn.offsetX
        this.setVolume()
        this.dragging = true
        this.addAnimation = false
      }
    },
    calcVolume($evn) {
      if(this.dragging) {
        this.vol += $evn.movementX 
        this.setVolume()
      }
    },
    setVolume(vol = this.vol) {
      this.$store.commit('volume', 100 / this.$refs.bar.clientWidth * vol)
    },
    drop() {
      this.dragging = false
    },
    scroll($evn) {
      this.addAnimation = false
      const delta = $evn.deltaY < 0 ? 4 : -4
      this.$store.commit('volume', this.volume + delta)
    },
    toggleMute() {
      this.$store.commit('toggleMute')
      this.addAnimation = true
    }
  }
}
</script>

<style lang="scss">
#app.BlackPlayer {
  & .mute-button {
    user-select: none;
    cursor: pointer;
    width: 16px;
    height: 14px;
  }
  & .volume-slider {
    display: flex;
    align-items: center;
    font-size: 12px;
    padding-top: 6px;
    user-select: none;
    & .volume-slider-bar {
      background-color: #4e5052;
      // background-image: linear-gradient(90deg, #212426, #111214);
      box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.4);
      position: relative;
      height: auto !important;
      width: 100%;
      overflow: hidden;
      & .volume-slider-inner {
        pointer-events: none;
        background-color: white;
        height: 4px;

        &.finish-animation {
          transition: width 1s ease;
        }
      }
    }
  }
}
</style>
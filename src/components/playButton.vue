<template>
  <div class="playbutton hoverable" @click="toggle">
    <div class="playbutton-inner">
      <div v-if="loading" class="player-loading">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="24 24 48 48" style="transform: rotate(0deg);"><circle fill="transparent" cx="48" cy="48" r="20" stroke-width="4" stroke-dasharray="125" stroke-dashoffset="125px" class="player-loading__overlay"></circle></svg>
      </div>

      <svg v-else-if="playing" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" class="svg-inline--fa fa-pause fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg>
      <svg v-else aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState([ 'playing', 'loading' ]),
  methods: {
    toggle() {
      this.setStatus(!this.playing)
    },
    setStatus(val = this.playing) {
      if(this.loading) return
      this.$store.commit('playing', val)
    }
  }
}
</script>

<style lang="scss">
#app.BlackPlayer {
  & .playbutton {
    margin-right: 6px;
    & .playbutton-inner {
      height: 28px;
      padding: 2px;
      width: 28px;
    }

    .player-loading {
      height: 30px;
      width: 30px;
      margin: -3px;
      & svg {
        animation: player-loading-rotate 1.3s linear infinite;
        transform-origin: center center;
        transition: all 0.2s ease-in-out;

        & .player-loading__overlay {
          stroke: currentColor;
          z-index: 2;
          transition: all 0.6s ease-in-out;
          animation: player-loading-dash 1.4s ease-in-out infinite;
          stroke-linecap: round;
          stroke-dasharray: 80, 200;
          stroke-dashoffset: 0px;
        }
      }
    }
    color: white;
  }
}

@keyframes player-loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0px;
  }
  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -125px;
  }
}

@keyframes player-loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>

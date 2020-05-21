<template>
  <div id="app" :class="classes" @mouseenter="$store.commit('activity', true)" @mouseleave="$store.commit('activity', false)">
    <div class="player-container">
      <div class="inner-wrapper">
        <Player />
      </div>
    </div>
  </div>
</template>

<script>
import Player from '@/views/Player.vue'
import { mapState } from 'vuex'
import playerControls from '@/mixins/playerControls'

export default {
  mixins: [ playerControls ],
  components: {
    Player
  },
  computed: {
    ...mapState([ 'activity' ]),
    classes () {
      const classes = [ 'BlackPlayer' ]
      classes.push(this.$store.state.options.fixed ? 'floating' : 'in-place')
      if(this.activity) classes.push('activity')
      return classes
    }
  }
}
</script>

<style lang="scss">

#app.BlackPlayer {

  & .player-container {
    padding: 0px 21px;
    width: 100%;
    background-color: #1e2329;
    // background-image: linear-gradient(125deg, #1e2329, #1e2329);

    & .inner-wrapper {
      width: 100%;
      height: 100%;
      max-width: 980px;
      margin: auto;
      padding: 8px 21px;
      background-color: #15191e;
      // background-color: #15191d;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
  }
  user-select: none;
  display: inline-block;
  width: 100%;
  color: #d1d2d3;
  & .hoverable {
    cursor: pointer;
    user-select: none;
    &:hover {
      color: white;
    }
  }

  height: 56px;
  &.activity {
  }
  transition: height .2s;

  &.floating {
    position: fixed;
    left: 0;
    bottom: 0;
    box-shadow: 0px -2px 4px 2px rgba(0, 0, 0, 0.14);
  }
  &.in-place, &:not(.floating) {
    position: relative;
  }
  &, & * {
    box-sizing: border-box !important;
  }
  & svg {
    display: block;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  & .text-right {
    text-align: right;
  }
  & .text-center {
    text-align: center;
  }
  & .text-left {
    text-align: left;
  }
}

</style>

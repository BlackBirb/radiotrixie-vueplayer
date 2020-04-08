<template>
  <div id="app" :class="classes" @mouseenter="activity = true" @mouseleave="activity = false">
    <div class="inner-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activity: false,
    }
  },
  computed: {
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
  user-select: none;
  display: inline-block;
  width: 100%;
  padding: 8px 21px;
  background-color: #29323c;
  background-image: linear-gradient(125deg, #323639, #212326);
  color: #d1d2d3;
  & .hoverable {
    cursor: pointer;
    user-select: none;
    &:hover {
      color: white;
    }
  }

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

  & .inner-wrapper {
    width: 100%;
    max-width: 980px;
    margin: auto;
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

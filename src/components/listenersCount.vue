<template>
  <div class="player-listeners" title="Listeners">
    <div class="listeners-inner">
      <span>{{ listeners }}</span>
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="headphones" class="listeners-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32C114.52 32 0 146.496 0 288v48a32 32 0 0 0 17.689 28.622l14.383 7.191C34.083 431.903 83.421 480 144 480h24c13.255 0 24-10.745 24-24V280c0-13.255-10.745-24-24-24h-24c-31.342 0-59.671 12.879-80 33.627V288c0-105.869 86.131-192 192-192s192 86.131 192 192v1.627C427.671 268.879 399.342 256 368 256h-24c-13.255 0-24 10.745-24 24v176c0 13.255 10.745 24 24 24h24c60.579 0 109.917-48.098 111.928-108.187l14.382-7.191A32 32 0 0 0 512 336v-48c0-141.479-114.496-256-256-256z"></path></svg>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([ 'listeners' ]),
    listeners() {
      const { listeners } = this.$store.state
      return listeners === null ? "-" : listeners
    }
  }
}
</script>

<style lang="scss">
#app.BlackPlayer .player-listeners {
  height: 100%;
  max-width: 200px;
  overflow: hidden;
  font-size: .78em;
  .listeners-inner {
    height: 100%;
    opacity: .8;
    align-items: center;
    justify-content: flex-end;
    display: flex;
  }

  .listeners-icon {
    opacity: .6;
    margin: 0 4px;
    width: 15px;
    height: 15px;
    padding-bottom: 2px;
  }
}
</style>
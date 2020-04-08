<template>
  <div class="player-contents">
    <div class="player-panel inline-panel" style="display: flex; align-items: center;">
      <PlayButton />
    </div>
    <div class="player-panel grow-panel">
      <InfoPanel />
      <VolumeSlider />
    </div>
  </div>
</template>

<script>
import PlayButton from '@/components/playButton.vue'
import VolumeSlider from '@/components/volumeSlider.vue'
import InfoPanel from '@/components/infoPanel.vue'

export default {
  name: 'Home',
  components: {
    PlayButton,
    VolumeSlider,
    InfoPanel
  }
}
</script>

<style lang="scss">
#app.BlackPlayer {
  & .player-contents {
    display: flex;
    width: 100%;
  }
  & .player-panel {
    margin: 0 3px;
    &.inline-panel {
      flex: 0 0 auto;
    }
    &.grow-panel {
      flex: 1 1 auto;
    }
    &.panel-row {
      margin: 0 -3px;
    }
  }
}
</style>

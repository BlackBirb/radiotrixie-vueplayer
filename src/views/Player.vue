<template>
  <div class="player-contents">
    <AudioSpectrum v-if="$store.state.options.visualizeAudio" />
    <TrackTimeline />
    <div class="player-panel inline-panel" style="display: flex; align-items: center;">
      <PlayButton />
    </div>
    <div class="player-panel grow-panel">
      <div class="player-row">
        <div class="player-panel grow-panel">
          <InfoPanel />
        </div>
        <div class="player-panel inline-panel">
          <RatingButtons />
        </div>
        <div class="player-panel inline-panel">
          <ListenersCount />
        </div>
        <div class="player-panel inline-panel">
          <TrackRequestButton v-if="$store.state.options.trackRequest" />
        </div>
      </div>
      <VolumeSlider />
    </div>
    <div class="player-panel inline-panel">
      <AlbumCover />
    </div>
  </div>
</template>

<script>
import PlayButton from '@/components/playButton.vue'
import VolumeSlider from '@/components/volumeSlider.vue'
import InfoPanel from '@/components/infoPanel.vue'
import ListenersCount from '@/components/listenersCount.vue'
import AlbumCover from '@/components/albumCover.vue'
import TrackRequestButton from '@/components/trackRequestButton.vue'
import TrackTimeline from '@/components/trackTimeline.vue'
import RatingButtons from '@/components/ratingButtons.vue'
import AudioSpectrum from '@/components/audioSpectrum.vue'

export default {
  name: 'Home',
  components: {
    PlayButton,
    VolumeSlider,
    InfoPanel,
    ListenersCount,
    AlbumCover,
    TrackRequestButton,
    TrackTimeline,
    RatingButtons,
    AudioSpectrum
  }
}
</script>

<style lang="scss">
#app.BlackPlayer {
  & .player-contents, 
  & .player-row {
    display: flex;
    width: 100%;
  }
  & .player-panel {
    margin: 0 3px;
    z-index: 5;
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

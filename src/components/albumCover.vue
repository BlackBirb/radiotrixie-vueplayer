<template>
  <div class="album-cover">
    <div class="album-cover-inner">
      <img v-if="albumCover" class="album-cover-content" :src="albumCover">
      <div v-else class="album-cover-content filler"></div>
      <div class="player-expand hoverable">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-up" class="svg-inline--fa fa-chevron-up fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path></svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    albumCover: state => state.activeTrack.albumCover,
    activity: 'activity'
  })
}
</script>

<style lang="scss">
#app.BlackPlayer {
  & .album-cover {
    height: 100%;
    position: relative;
    & .album-cover-inner {
      // background-image: linear-gradient(45deg, #3a414d, #1f2735);
      height: 40px;
      width: 40px;
      overflow: hidden;
      border-radius: 3px;
      background: #15191d;
      position: relative;

      & .player-expand {
        height: 100%;
        width: 100%;
        position: absolute;
        transform: translateY(100%);
        top: 0;
        left: 0;
        z-index: 0;

        & svg {
          padding: 8px;
        }
      }

    }

    & img {
      object-fit: contain;
      height: 100%;
      width: auto;
    }

    & .album-cover-content {
      height: 100%;
      width: auto;
      opacity: 1;
      transform: translateY(0);
    }
    & .album-cover-content,
    & .player-expand {
      transition: all .4s cubic-bezier(0, 0, 0.2, 1);
    }
  }
  &.activity .album-cover {
    & .album-cover-content {
      opacity: .3;
      // transform: translateY(-100%);
    }
    & .player-expand {
        transform: translateY(0%);
    }
  }
}
</style>
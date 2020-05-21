<template>
  <div class="player-btn track-request hoverable">
    <a href="#" @click="open" class="btn-inner">
      <span>Request a song</span>
    </a>
  </div>
</template>

<script>
let ww = null;
export default {
  methods: {
    open() {
      if(!ww || ww.closed) {
        ww = window.open(this.$store.state.options.trackRequest, 'bprequest')
        window.ww = ww
        ww.top.finish = (withClose = true) => {
          if(withClose) {
            ww.close()
            ww = null
          }
          this.$store.dispatch('alert', 'Song requested!')
        }
      }
      ww.focus()
    }
  }
}
</script>

<style lang="scss">
#app.BlackPlayer.activity .player-btn{
  background-color: #1e2329;
}
#app.BlackPlayer {
  & .player-btn {
    display: inline-block;
    flex: 0 0 auto;
    font-size: .78em;
    border-radius: 2px;
    position: relative;

    transition: background .28s cubic-bezier(0.15, 0.15, 0.2, 1);  
    background-color: transparent;
    &:hover {
      background-color: #252b32;
    }

    & .btn-inner {
      display: block;
      padding: 4px 12px;
    }
    & a,
    a.player-btn {
      color: inherit;
      text-decoration: none;
      display: block;
    }
  }
}
</style>
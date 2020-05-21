<template>
  <div class="fft-wrap">
    <canvas ref="render" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import FFT from '@/mixins/FFTBridge.js'

// eslint-disable-next-line no-unused-vars
let ctx; // we dont want ctx to be reactive
// eslint-disable-next-line no-unused-vars
let handle;

const step = 2//2**1;
const dataLength = 511 
const begin = 3

const bandAmount = (dataLength/step-begin)

export default {
  mixins: [ FFT ],
  data() {
    return {
      width: null,
      height: null
    }
  },
  mounted() {
    const { render } = this.$refs
    ctx = render.getContext('2d')
    this.loop()
  },
  beforeDestroy() {
    cancelAnimationFrame(handle)
    ctx = null
  },
  methods: {
    loop() {
      this.fixSize()
      const { width, height } = this.$refs.render
      const data = this.fetchFFTData()
      ctx.clearRect(0, 0, width, height)
      ctx.font = "24px Arial"
      ctx.fillStyle = "rgba(255,255,255, .075)"
      let zeroFrom = Infinity;
      const bandWidth = width / bandAmount
      for(let i = begin; i < dataLength*step; i+=step) {
        const val = data.slice(i, i+step).reduce((a,b) => a+b, 0) /step
        const mapped = height / 255 * val
        
        // ctx.fillRect(bandWidth*(i/step)-begin*bandWidth + (bandWidth*.75), height, bandWidth, -mapped)
        
        ctx.fillStyle = "#1d2125"
          // "#202326"
          // "rgba(78, 80, 82, .1)" 
          // "#1b1f23"
        const x = bandWidth*(i/step)-begin*bandWidth
        ctx.fillRect(x, height, bandWidth, -mapped)
        ctx.fillRect(x + (bandWidth*.25), height, bandWidth, -mapped)

        if(val < 1 && i < zeroFrom && i > 24)
          zeroFrom = i
      }

      // ctx.fillText(Date.now(), 250, 24)
      // ctx.fillText(dataLength, 435, 24)
      // ctx.fillText(zeroFrom, 500, 24)
      // ctx.fillText(`${Math.round(window.$audioInstance.currentTime)}/${Math.round(window.$audioInstance.duration)}`, 575, 24)
      handle = requestAnimationFrame(() => this.loop())
    },
    fixSize() {
      const { render } = this.$refs
      if(this.width !== render.clientWidth)
        this.width = render.clientWidth
      if(this.height !== render.clientHeight)
        this.height = render.clientHeight
    }
  }
}
</script>

<style lang="scss">
#app.BlackPlayer {
  & .fft-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    // background: #15191d;

    & canvas {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style> 
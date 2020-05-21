import FFT from '@/audio/FFT'

export default {
  methods: {
    getFFTData() {
      return FFT.dataArray
    },
    fetchFFTData() {
      return FFT.fetchData()
    },
    getFFT() {
      return FFT.analyser
    }
  }
}
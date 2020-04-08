import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function (root) {
  const options = { options: window[root.dataset.config] } || { options: {} }

  return new Vuex.Store({
    state: Object.assign({}, options, {
      status: false,
      volume: 36,
      volumeCache: 36
    }),
    mutations: {
      status(state, payload) {
        state.status = !!payload
      },
      volume(state, arg) {
        const payload = Math.max(Math.min(arg, 100), 0)
        if(payload > 0)
          state.volumeCache = payload
        else if(state.volume > 0)
          state.volumeCache = state.volume
        state.volume = payload
      },
      toggleMute(state) {
        if(state.volume > 0)
          state.volume = 0
        else
          state.volume = state.volumeCache
      }
    },
    actions: {
    },
    modules: {
    }
  })
}
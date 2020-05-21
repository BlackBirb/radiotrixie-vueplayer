import Vue from 'vue'
import Vuex from 'vuex'
import { Track } from '@/uAPI'

Vue.use(Vuex)

const defaultOptions =  {
  fixed: true,
  sliderSpeed: 5000,
  trackRequest: false,
  slides: [],
  visualizeAudio: true,
  audioSrc: null
}

const defaultTrack = {
  id: 0, // any uid
  title: 'Error',
  author: 'Loading', // can be null or text to combine
  // albumCover: require('@/assets/cover.png'), // cdn or local file
  // duration: 239.15102, // in s
  // beginAt: Date.now() // timestamp
}

export default function (userOptions) {
  return new Vuex.Store({
    state: Object.assign({}, {
      activeTrack: defaultTrack
    },
    { options: Object.assign({}, defaultOptions, userOptions) },
    {
      activity: false,
      playing: false,
      loading: false,
      volume: 36,
      listeners: null,
      volumeCache: 36,
      alert: null
    }),
    mutations: {
      playing(state, payload) {
        state.playing = !!payload
      },
      loading(state, payload) {
        state.loading = !!payload
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
      },
      listeners(state, payload) {
        state.listeners = payload
      },
      albumCover(state, payload) {
        state.albumCover = payload || null
      },
      activity(state, payload) {
        state.activity = Boolean(payload)
      },
      infoSlides(state, payload) {
        state.options.slides = payload.slice()
      },
      alert(state, payload) {
        state.alert = payload
      },
      activeTrack(state, payload) {
        state.activeTrack = Object.assign({}, payload)
      }
    },
    actions: {
      updateTrack ({ state, commit }, payload) {
        if(!(payload instanceof Track)) {
          const err = new TypeError("Provided argument was not an instance of: Track")
          console.error(err)
          return err
        }
        const newTrack = {
          id: payload.id
        }
        Object.keys(payload).forEach(key => {
          if(payload[key])
            newTrack[key] = payload[key]
        })
        if(newTrack.id !== state.activeTrack.id)
          commit('activeTrack', newTrack)
      },
      setListeners ({ commit }, payload) {
        if(payload === null) {
          commit('listeners', null)
          return null
        }
        let listeners = Number(payload)
        if(isNaN(listeners)) {
          const err = new TypeError("Listeners count has to be a number")
          console.error(err)
          return err
        }
        commit('listeners', listeners)
      },
      alert ({ commit }, payload) {
        commit('alert', payload)
      },
      setSlider({ commit }, payload) {
        commit('infoSlides', payload.filter(item => typeof item === 'string'))
      },
      appendSlider({ state, commit }, payload) {
        const slides = [ 
          ...state.options.slides, 
          ...Array.prototype.concat.apply([], [ payload ]) 
        ]
        commit('infoSlides', slides.filter(item => typeof item === 'string'))
      }
    },
    getters: {
      currentTrack(state) {
        const t = state.activeTrack
        return new Track(
          t.id,
          { title: t.tile, author: t.author },
          { albumCover: t.albumCover, duration: t.duration, beginAt: t.beginAt }
        )
      },
      slider(state) {
        return state.options.slides.slice()
      }
    }
  })
}
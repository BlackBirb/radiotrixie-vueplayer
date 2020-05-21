import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as uAPI from './uAPI'

Vue.config.productionTip = false

const root = document.querySelector('#app.BlackPlayer');

const rootConfig = window.blackConfig

if(!rootConfig.handler)
  throw new Error("Player handler not defined")

const storeInstance = store(rootConfig[root.dataset.config || 'options'] || {})

new Vue({
  el: root,
  router,
  store: storeInstance,
  render: h => h(App)
}).$mount('#app')

uAPI.createWith(rootConfig.handler, storeInstance)

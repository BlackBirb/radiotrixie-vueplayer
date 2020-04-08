import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const root = document.querySelector('#app.BlackPlayer');

new Vue({
  el: root,
  router,
  store: store(root),
  render: h => h(App)
}).$mount('#app')

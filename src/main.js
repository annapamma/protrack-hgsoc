import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'

import AsyncComputed from 'vue-async-computed'

// import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'


Vue.use(AsyncComputed)
Vue.config.productionTip = false

// Vue.use(Buefy)

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

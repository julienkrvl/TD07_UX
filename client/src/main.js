import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// eslint-disable-next-line
import { library } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line
import { faPen } from '@fortawesome/free-solid-svg-icons'
// eslint-disable-next-line
import { faCheck } from '@fortawesome/free-solid-svg-icons'
// eslint-disable-next-line
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPen)
library.add(faCheck)
library.add(faTrash)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import routes from './routes/routes'
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(BootstrapVue)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// harness
import pages from './harness-pages/manifest'
import harness from '@rtidatascience/harness'
import { harnessUI } from '@rtidatascience/harness-ui'

// highcharts
import HighchartsVue from 'highcharts-vue'

// styles
import 'bootstrap'
import '@/styles/main.scss'

Vue.use(harness, { store, router, pages })
Vue.use(harnessUI)
Vue.config.productionTip = false
Vue.use(HighchartsVue)
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

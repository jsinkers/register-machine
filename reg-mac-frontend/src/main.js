// 'use strict'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap'
import 'vue-material-design-icons/styles.css'

import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  el: '#app',
  render: h => h(App),
  mounted() {
    if (!localStorage.challenges) {
      localStorage.challenges = JSON.stringify({data: []})
    } else {
      try {
        JSON.parse(localStorage.getItem('challenges'));
      } catch(e) {
        localStorage.removeItem('challenges');
        localStorage.challenges = JSON.stringify({data: []})
      }
    }
  }
}).$mount('#app')

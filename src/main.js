import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import createStore from './vuex/store'
import NavHeader from './components/NavHeader'
import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.component('NavHeader', NavHeader)

Vue.config.productionTip = false

const store = createStore()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

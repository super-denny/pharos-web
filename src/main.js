import Vue from 'vue'
import TDesign from 'tdesign-vue';
import 'tdesign-vue/es/style/index.css';
import * as echarts from 'echarts'

import VueClipboards from 'vue-clipboard2'

import App from './App.vue'
import router from './router';
import axios from 'axios'

import CodeDiff from 'v-code-diff'

axios.defaults.baseURL='/api'
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(TDesign)
Vue.use(CodeDiff);
Vue.use(VueClipboards);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

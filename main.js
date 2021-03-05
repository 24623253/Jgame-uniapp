import Vue from 'vue'
import App from './App'
import store from './store'; // vueX

import request from './utils/request'; // request请求
import myComponents from './components'; // 自定义组件
import * as common from './utils/common'; // 公共方法库


Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$request = request;
Vue.prototype.$store = store;
Vue.prototype.$common = common;
Vue.use(myComponents);


const app = new Vue({
	...App
})
app.$mount()

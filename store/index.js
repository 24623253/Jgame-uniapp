import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import app from './modules/app';

Vue.use(Vuex);

const store = new Vuex.Store({
  getters,
  ...app
}); // 小程序目前只支持挂载一个文件

export default store;

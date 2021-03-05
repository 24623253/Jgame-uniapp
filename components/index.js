import WxApi from './wx-api';

export default {
  install: Vue => {
    Vue.prototype.$wxApi = WxApi;
  }
}
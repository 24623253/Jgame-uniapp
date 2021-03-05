import { baseApi } from '@/setting';
import { getToken } from '@/utils/auth';
import $wxApi from '@/components/wx-api';
// import $store from '@/store';

const ERR_CODE = 'success';

export default {
  // get 请求
  get(url, params, baseURI = baseApi, header) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: baseURI + url,
        data: params,
        method: 'get',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ['X-Access-Token']: getToken(),
		  ['Authorization']:getToken(),
          t: new Date().getTime(),
          ...header
        },
        success: res => this._callBack(res, resolve, reject),
        fail: () => this._failRequest(resolve, reject)
      })
    })
  },

  // post 请求
  post(url, params, baseURI = baseApi, header) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: baseURI + url,
        data: params,
        method: 'post',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ['X-Access-Token']: getToken(),
          t: new Date().getTime(),
          ...header
        },
        success: res => this._callBack(res, resolve, reject),
        fail: () => this._failRequest(resolve, reject)
      })
    })
  },

  // post(Json格式) 请求
  postJson(url, params, baseURI = baseApi, header) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: baseURI + url,
        data: params,
        method: 'post',
        header: {
          'Content-Type': 'application/json',
          ['X-Access-Token']: getToken(),
          t: new Date().getTime(),
          ...header
        },
        success: res => this._callBack(res, resolve, reject),
        fail: () => this._failRequest(resolve, reject)
      })
    })
  },

  // delete 请求
  delete(url, params, baseURI = baseApi, header) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: baseURI + url,
        data: params,
        method: 'delete',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ['X-Access-Token']: getToken(),
          t: new Date().getTime(),
          ...header
        },
        success: res => this._callBack(res, resolve, reject),
        fail: () => this._failRequest(resolve, reject)
      })
    })
  },

  // put 请求
  put(url, params, baseURI = baseApi, header) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: baseURI + url,
        data: params,
        method: 'put',
        header: {
          'Content-Type': 'application/json',
          ['X-Access-Token']: getToken(),
          t: new Date().getTime(),
          ...header
        },
        success: res => this._callBack(res, resolve, reject),
        fail: () => this._failRequest(resolve, reject)
      })
    })
  },

  // request 请求回调
  // TODO:后台返回 data.code = '0' 为正常状态
  _callBack(res, resolve, reject) {
    switch (res.data.code) {
      case '0':
        if (res.data.code === '0') {
          resolve(res.data);
          return;
        }
        $wxApi.toast(res.data.message || '出现未知错误，请联系管理员');
        reject(res.data.message || '出现未知错误，请联系管理员');
        break;
	  case '201':
		$wxApi.toast(res.data.message || '密码或账号错误')
		reject(res.data.message || '出现未知错误，请联系管理员');
		break;
      case 401:
        const modalData = {
          content: '您的账户信息已过期，请重新登录',
          showCancel: false,
          confirmText: '重新登录'
        };
        $wxApi.modal(modalData).then(() => {
          $store.dispatch('ResetToken').then(() =>
            uni.reLaunch({
              url: './../login/index'
            }))
        });
        break;

      case 408:
        $wxApi.toast('请求超时，请稍后重试');
        break;

      case 500:
        $wxApi.toast('服务器异常，请稍后重试');
        break;

      case 504:
        $wxApi.toast('请求超时，请稍后重试');
        break;

      default:
        $wxApi.toast('请求异常，请联系管理员');
    }
  },

  // 请求发送失败回调
  _failRequest(resolve, reject) {
    $wxApi.toast('服务器连接失败，请检查网络');
    reject();
  }
}

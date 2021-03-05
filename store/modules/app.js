import auth from '@/utils/auth';
import $request from '@/utils/request';
import { baseApi } from '@/setting.js'
const app = {
  state: {
    token: auth.getToken(),
    userInfo: auth.getUserInfo(),
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
  },

  actions: {
    // 账号密码登陆
    Login({ commit }, form) {
      const { username, password } = form;
      return new Promise(((resolve, reject) => {
        $request.postJson('/api/uni/login', { username, password }).then(res => {
		  const data = Object.assign({},res.data)
		  data.userInfo.headImg = baseApi + data.userInfo.headImg
		  data.userInfo.loginType = 'byzhmm'
          const {userInfo, token } = data
          commit('SET_TOKEN', token);
          commit('SET_USER_INFO', userInfo);
          auth.setToken(token);
          auth.setUserInfo(userInfo);
          resolve();
        }).catch((error) => {
          reject(error)
        });
      }))
    },
	
	// 微信授权登陆 -》小程序端
	WxLogin({ commit }, data) {
	  const userInfo = Object.assign({},data);
	  return new Promise(((resolve, reject) => {
	    $request.postJson('/api/uni/wx-login/token',userInfo).then(res => {
			if (!res.data) return false
			const token = res.data
			userInfo.headImg = userInfo.avatarUrl
			userInfo.name = userInfo.nickName
			userInfo.loginType = 'bywxsq_mpWx'
			commit('SET_TOKEN', token);
			commit('SET_USER_INFO', userInfo);
			auth.setToken(token);
			auth.setUserInfo(userInfo);
			resolve();
	    }).catch((error) => {
	      reject(error)
	    });
	  }))
	},
	
	// 微信授权登陆 -》app端
	appByWxLogin({commit},data){
		return new Promise((resolve, reject)=>{
			$request.postJson('/api/uni/wx-login/mpWxGetAuthUserInfo',data).then(res=>{
				const {token,userInfo} = res.data
				console.log(token,userInfo)
				userInfo.headImg = userInfo.headimgurl
				userInfo.name = userInfo.nickname
				userInfo.loginType = 'bywxsq_app'
				commit('SET_TOKEN', token);
				commit('SET_USER_INFO', userInfo);
				auth.setToken(token);
				auth.setUserInfo(userInfo);
				resolve()
			}).catch(error=>{
				reject(error)
			})
		})
	},

    // 清除用户信息
    ResetToken({ commit }, res) {
		const { loginType } = res
      return new Promise((resolve => {
        commit('SET_TOKEN', '');
        commit('SET_USER_INFO', '');
        auth.setToken('');
        auth.setUserInfo('');
		
		// TODO:暂未找到注销微信授权的方法
		// if(loginType==='bywxsq_mpWx'){
		// 	aweixin.logout((e)=>{
		// 		console.log(e)
		// 		plus.nativeUI.alert("注销登录认证成功!");
		// 	})
		// }
        resolve(res);
      }))
    },

  }
};

export default app;

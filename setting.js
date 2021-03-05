
// 仅编译在 微信小程序/支付宝小程序/百度小程序/字节跳动小程序/QQ小程序/360小程序 
// // #ifdef MP
// 	export const baseApi = 'http://127.0.0.1:8008'
// // #endif

// 仅编译在 微信
// #ifdef MP-WEIXIN
	// export const baseApi = 'http://192.168.3.167:8008'
	export const baseApi = 'http://101.133.171.109:8008'
// #endif

// 仅编译在 app
// #ifdef APP-PLUS
	export const baseApi = 'http://101.133.171.109:8008'
// #endif

// 仅编译在 H5
// #ifdef H5
	export const baseApi = 'http://101.133.171.109:8008'
// #endif

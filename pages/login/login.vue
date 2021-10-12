<template>
	<view>
		<view class="d-flex a-center b-box mb-5" style="width: 750rpx;">
			<form @submit="formSubmit">
				<view class="bg-white py-1 mb-2 flex-1 d-flex  a-center bg-light rounded font" style="height: 65rpx;">
					<text class="px-2 text-light-muted">账号</text>
					<input confirm-type="next" focus="true" maxlength='14' name='user' :value="user" class="flex-1 d-flex  a-center bg-light rounded font "
					 placeholder-class='placeholder' placeholder="账号/手机号/邮箱"></input>
				</view>
				<view class="bg-white mb-2 py-1 flex-1 d-flex  a-center bg-light rounded font" style="height: 65rpx;">
					<text class="px-2 text-light-muted">密码</text>
					<input confirm-type="done" name='password' maxlength='14' password="true" :value="password" class="flex-1 d-flex  a-center bg-light rounded text-light-muted  font "
					 placeholder-class='placeholder' placeholder="登陆密码"></input>
				</view>
				<view class="px-2 py-1">
					<button class="footDownBtn font" form-type="submit" :loading="loading" :disabled="loading" hover-class="none">登陆</button>
				</view>
			</form>
		</view>

		
		<!-- #ifdef APP-PLUS -->
		<!-- <view class="px-2 py-1"> -->
			<!-- <button class="footDownBtn font" @tap="wxLoginByApp">微信登录</button> -->
			<!-- TODO： -->
			<!-- <button class="footDownBtn font" @tap="loginByWeixin" open-type="getUserInfo">微信登录</button> -->
		<!-- </view> -->
		<!-- #endif -->
		
		<!-- #ifdef MP-WEIXIN -->
		<!-- <view class="px-2 py-1">
			<button class="footDownBtn font" open-type="getUserInfo" @getuserinfo="getUserInfo">微信授权登录</button>
		</view> -->
		<!-- #endif -->
		
		<!-- #ifndef H5 -->
		<view class="px-2 mb-2 text-center main-text-color">
			<text>当然,您还可以选择其他方式登录↓</text>
		</view>
		<view class="row px-5" style="justify-content: space-around;">
			<block v-for="(item,index) in loginBtn" :key='index'>
				<view class="d-flex j-center a-center">
					<!-- #ifdef MP-WEIXIN -->
					
					<template v-if="item.id==='0'">
						<!-- TODO:根据微信开放文档open-type="getUserInfo"自2018-04-15开始不弹出用户授权，自动静默授权。 -->
						<!-- <button class="loginIconBtn font" :plain="true" hover-class="none" open-type="getUserInfo" @getuserinfo="getUserInfo"> -->
						<button class="loginIconBtn font" :plain="true" hover-class="none" @click="bindGetUserInfo">
							<image class=" loginIcon" :src="item.url" mode="widthFix" lazy-load style="width: 80rpx;"></image>
						</button>
					</template>
					<template v-else>
						<button class="loginIconBtn font" :plain="true" hover-class="none" >
							<image class=" loginIcon" :src="item.url" mode="widthFix" lazy-load style="width: 80rpx;"></image>
						</button>
					</template>
					
					<!-- #endif -->
					
					<!-- #ifdef APP-PLUS -->
					<button class="loginIconBtn font" :plain="true" hover-class="none" @tap="loginIconClick(item.id)">
						<image class=" loginIcon" :src="item.url" mode="widthFix" lazy-load style="width: 80rpx;"></image>
					</button>
					<!-- #endif -->
					
					<!-- <image :src="item.url" mode="widthFix" lazy-load style="width: 80rpx;"></image> -->
				</view>
			</block>
		</view>
		<!-- #endif -->
		


	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: '',
				password: '',
				hasWeixinAuth: false,
				weixinAuthService:'',
				myCloud:'',
				loading:false,
				loginBtn:[
					{ url:'../../static/appIcon/wexin.png',id:'0' },
					{ url:'../../static/appIcon/qq.png',id:'1' },
					{ url:'../../static/appIcon/weibo.png',id:'2' },
					{ url:'../../static/appIcon/zhifubao.png',id:'3' }
				]
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			
			this.myCloud = uniCloud.init({
			  provider: 'aliyun',
			  spaceId: 'xxxx-yyy',
			  clientSecret: 'xxxx'
			});
			
			// 获取登录授权认证服务列表
			plus.oauth.getServices((services) => {
				console.log(services)
				this.weixinAuthService = services.find((service) => {
					return service.id === 'weixin'
				})
				if (weixinAuthService) {
					this.hasWeixinAuth = true
				}
			});
			// #endif
		},
		methods: {

			// 提交登录表单
			formSubmit(e) {
				const {
					user,
					password
				} = e.detail.value

				if (!user || !password) {
					this.$wxApi.toast('账号密码不能为空');
					return
				}
				this.loading = true
				this.$wxApi.loading('请稍后...');
				this.$store.dispatch('Login', {
					username: user,
					password: password,
				}).then(() => {
					this.$wxApi.loading();
					this.$wxApi.toast('成功登陆');
					setTimeout(() => {
						this.loading = false
						uni.navigateBack()
					}, 1000)

					// uni.reLaunch({ url: './../index/index' });
				})
			},
			
			
			// #ifdef APP-PLUS
			loginIconClick(id){
				// 点击下方登录icon
				if(id!='0') return this.$wxApi.toast('暂时提供微信登录哦~');
				this.wxLoginByApp()
				
			},
			// #endif
			

			getWeixinCode() {
				return new Promise((resolve, reject) => {
					// // #ifdef MP-WEIXIN
					// uni.login({
					//   provider: 'weixin',
					//   success(res) {
					//     resolve(res.code)
					//   },
					//   fail(err) {
					//     reject(new Error('微信登录失败'))
					//   }
					// })
					// // #endif
					// #ifdef APP-PLUS
					this.weixinAuthService.authorize(function(res) {
						// plus.nativeUI.alert("授权成功："+JSON.stringify(res));
						console.log(res,'<<<res授权成功')
						resolve(res.code)
					}, function(err) {
						console.log(err,'<<<<err')
						reject(new Error('微信登录失败'))
					});
					// #endif
				})
			},
			
			// TODO:
			// loginByWeixin() {
			// 	var that = this
			// 	this.getWeixinCode().then(code=>{
			// 		uni.getProvider({ // 拉起授权
			// 			service: 'oauth', // 授权服务
			// 			success(e) {
			// 				console.log(e.provider) //  打印支持微信、qq和微博等供应商
			// 				if (e.provider.indexOf('weixin')) { // 判定微信的授权登录
			// 					uni.login({
			// 						provider: 'weixin', // 微信
			// 						success(loginRes) {
			// 							const data = {
			// 								access_token: loginRes.authResult.access_token,
			// 								openid: loginRes.authResult.openid
			// 							}
			// 							that.getApploginData(data) //请求登录接口方法
										
			// 						},
			// 						fail(failRes) {
			// 							console.log('APP微信授权失败：', failRes)
			// 						}
			// 					})
			// 				}
					
			// 			}
			// 		})
			// 	})
				// this.getWeixinCode().then((code) => {
				// 	console.log(code,'<<<code')
				// 	console.log(uniCloud)
				// 	return this.myCloud.callFunction({
				// 		name: 'login-by-weixin',
				// 		data: {
				// 			code
				// 		}
				// 	})
				// }).then((res) => {
				// 	console.log(res,'res')
				// 	uni.showModal({
				// 		showCancel: false,
				// 		content: JSON.stringify(res.result)
				// 	})
				// 	if (res.result.code === 0) {
				// 		uni.setStorageSync('uni_id_token', res.result.token)
				// 		uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
				// 	}
				// }).catch((err) => {
				// 	console.log(err,'err')
				// 	uni.showModal({
				// 		showCancel: false,
				// 		content: '微信登录失败，请稍后再试'
				// 	})
				// })
			// },

			// wxLoin(){
			// 	wx.login({
			// 		// provider:'weixin',
			// 		success(res){
			// 			console.log('成功：',res)
			// 		},
			// 		fail() {
			// 			console.log('失败：',res)
			// 		}
			// 	})
			// },

			wxLoginByApp() {
				var that = this
				uni.getProvider({ // 拉起授权
					service: 'oauth', // 授权服务
					success(e) {
						console.log(typeof e.provider) //  打印支持微信、qq和微博等供应商
						console.log(JSON.stringify(e.provider))
						if (e.provider.includes('weixin')) { // 判定微信的授权登录
							console.log(111)
							uni.login({
								provider: 'weixin', // 微信
								success(loginRes) {
									const data = {
										access_token: loginRes.authResult.access_token,
										openid: loginRes.authResult.openid
									}
									// 授权登录 第一种方式
									that.getApploginData(data) //请求登录接口方法
									// TODO:第二种方式
									// uni.getUserInfo({
									//     provider: 'weixin',
									//     success: function(infoRes) {
									//         console.log('-------获取微信用户所有-----');
									//         console.log(JSON.stringify(infoRes.userInfo));
									//     }
									// });
								},
								fail(failRes) {
									console.log('APP微信授权失败：', failRes)
								}
							})
						}

					}
				})
			},
			getApploginData(data) {
				this.$wxApi.loading('请稍后...');
				this.$store.dispatch('appByWxLogin', data).then(res => {
					this.$wxApi.loading();
					this.$wxApi.toast('微信登录成功');
					setTimeout(() => {
						uni.navigateBack()
					}, 1000)
				})
			},

			// getUserInfo(e) {
			// 	this.loading = true
			// 	this.$wxApi.loading('请稍后...');
			// 	console.log(e)
			// 	this.$store.dispatch('WxLogin', e.detail.userInfo).then(res => {
			// 		this.$wxApi.loading();
			// 		this.$wxApi.toast('成功登陆');
			// 		setTimeout(() => {
			// 			this.loading = false
			// 			uni.navigateBack()
			// 		}, 1000)
			// 	})
			// },
			
			loginByWeixin(userInfo){
				console.log(userInfo)
					this.$store.dispatch('WxLogin', userInfo).then(res => {
						// this.$wxApi.loading();
						this.$wxApi.toast('成功登陆');
						setTimeout(() => {
							this.loading = false
							uni.navigateBack()
						}, 1000)
					})
			},
			
			bindGetUserInfo(e) {
			                let _this = this
							uni.getUserProfile({
								desc:'weixin',   
								success:res=>{
									console.log(res,'授权成功');
									this.$wxApi.loading('请稍后...');
									_this.loginByWeixin(res.userInfo)
								},
								fail:err=>{
									console.log(err,'失败授权')
								}
							})
			            },
		

		}
	}
</script>

<style>
	page {
		background-color: #F0F0F0;
	}
</style>

<style scoped lang="less">
	.footDownBtn {
		background-color: #0193E0;
		height: 70rpx;
		line-height: 70rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
		button::after {
			  border: none;
			  background-color: #0193E0;
			  height: 70rpx;
			  line-height: 70rpx;
			  color: #FFFFFF;
			  border-radius: 10rpx;
			  
		}
		
	}
	
	button[disabled] {
		 background-color: #0193E0 !important;
		 color: #ffffff;
		 opacity: 0.5;
	}

	input {
		height: 65rpx;
		line-height: 65rpx;
	}

	.placeholder {
		color: #B2B2B2;
	}
	.loginIconBtn{
		border: 0;
		// TODO:
		// .loginIcon{
		// 	box-shadow: 0 35px 35px rgba(0,0,0,0.5);
		// 	-webkit-box-shadow: 0 35px 35px rgba(0,0,0,0.5);
		// 	-moz-box-shadow: 0 35px 35px rgba(0,0,0,0.5);
		// }
	}
</style>

<template>
	<view class="col-6 d-flex a-center adminMenuItem" @tap='menuClick(res.name)'>
		<text class="ml-5 iconfont font-lg" :class="res.icon" :style="{'color': bgcolor}" ></text>
		<text class="pl-2">{{res.name}}</text>
	</view>
</template>

<script>
	export default{
		props:{
			res:{
				type:Object,
				default:{}
			},
			bgcolor:{
				type:String,
				default:'#FF623E'
			}
		},
		methods:{
			menuClick(name){
				if(!this.$store.getters.userInfo) return this.$wxApi.toast('请登陆')
				switch(name){
					case '设置':
					  uni.navigateTo({
					  	url:'../../pages/setting/setting'
					  })
					  break;
					default:
					  this.$wxApi.toast('正在开发中，敬请期待~')
					break
				}
			}
		}
	}
</script>

<style scoped>
	.adminMenuItem{
		border-right: #F0F0F0 solid 1rpx;border-bottom: #F0F0F0 solid 1rpx;height: 120rpx;
	}
</style>

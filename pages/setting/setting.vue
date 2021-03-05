<template>
	<view>
		<text>更多功能正在开发中...</text>
		<!-- 底部按钮 -->
		<view class="position-fixed left-0 bottom-0 right-0 px-3 py-1 border-top bg-white" >
			<button class="footDownBtn font" @tap='exit'>退出账号</button>
		</view>
	</view>
</template>

<script>
	export default {

		methods: {
			exit(){
				this.$wxApi.loading('请稍后...');
				const loginType = this.$store.getters.userInfo.loginType
				this.$store.dispatch('ResetToken',{loginType}).then(()=>{
					setTimeout(()=>{
						this.$wxApi.loading();
						uni.navigateBack({})
					},500)
				})
			}
		}
	}
</script>

<style>
.footDownBtn{
	background-color:  #0193E0;
	height: 70rpx;
	line-height: 70rpx;
	color: #FFFFFF;
	border-radius: 10rpx;
}
</style>

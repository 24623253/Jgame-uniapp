<template>
	<view>
		<view class="d-flex flex-column a-center" :style="'height:' + scrollH + 'px'" style="padding-top: 400rpx;">
			<view class="">感谢您的广告赞助</view>
			<view class="">让我们能有子弹从事开发，做出更好的产品</view>
			<view class="">小鸡将会长的更加茁壮</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollH:500
			}
		},
		created(){
			// 获取可是区域高度
			let res = uni.getSystemInfoSync()
			// #ifndef MP
			let navbarH = 0
			// #endif
			// #ifdef MP
			let navbarH = uni.upx2px(90)
			// #endif
			this.scrollH = res.screenHeight - 88 - res.statusBarHeight - navbarH
			console.log(this.scrollH)
		},
		methods: {
			
		}
	}
</script>

<style >
page{
	background-color: #F0F0F0;
}
</style>

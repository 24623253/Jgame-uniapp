<template>
	<view  class="b-box py-2  col-4 j-center text-center" >
		<!-- <image @tap='gameClick(res.id)' v-if="res.online" lazy-load class="mb-0" style="width: 220rpx; border-radius: 25rpx;" mode="widthFix" :src="res.src" ></image> -->
		<!-- <image @tap='gameClick(res.id)' v-else lazy-load class="mb-0" style="width: 220rpx; border-radius: 25rpx;" mode="widthFix" :src="res.src" ></image> -->
		<!-- <image @tap='gameClick(res.id)' lazy-load class="mb-0" style="width: 220rpx; border-radius: 25rpx;" mode="widthFix" :src="res.src" ></image> -->
		<image @tap='gameClick(res.id)' lazy-load class="mb-0" style="width: 220rpx;height: 220rpx; border-radius: 25rpx;"  :src="res.src" ></image>
		<text class="d-block text-center font-sm line-h mb-1">{{res.name}}</text>
		<view class="d-flex a-center">
			<button class="font-sm main-bg-color downBtn" @tap='gameClick(res.id)'>下载</button>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			res:{
				type:Object,
				default:{}
			}
		},
		methods:{
			gameClick(id) {
				uni.navigateTo({
					url:`../gameDetails/gameDetails?id=` + id
				})
			},
		}
	}
</script>

<style scoped>

</style>

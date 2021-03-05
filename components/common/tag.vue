<template>
	<view class='px-2 mr-2 main-text-color font-sm tag d-inline-block'>{{res}}</view>
</template>

<script>
	export default{
		props:{
			res:{
				type:String,
				default:''
			}
		}
	}
</script>

<style scoped="scoped">
	.tag{
		border:#0193E0 solid 1rpx;
		border-radius: 40rpx;
		border-style: solid;
		border-color: #0193E0;
		border-width: 1rpx;
	}
</style>

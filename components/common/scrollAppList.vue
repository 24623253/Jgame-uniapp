<template>
	<!--  APPscrollX组件 -->
	<view class="scrollAppList">
		<scroll-view scroll-x="true" class="scroll-row px-2 ">
			<block v-for="(item, index) in res" :key="index">
				<view class="scroll-row-item d-flex flex-column" style="margin-right: 25rpx;" :id="item.id" @tap='appClick(item.id)'>
					<image :src="item.src" mode="" class="scrollImg" style="" lazy-load></image>
					<view style="" class="text-center font-sm gameName">{{ item.name }}</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
export default {
	props: {
		res: {
			type: Array,
			default: []
		}
	},
	methods:{
		appClick(id){
			uni.navigateTo({
				url:`../gameDetails/gameDetails?id=` + id
			})
		}
	}
};
</script>

<style scoped>


/* 文本溢出换行 */
.gameName {
	width: 124rpx;
	line-height: 30rpx;
	word-break: break-all;
	word-wrap: break-word;
	white-space: pre-line;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.scrollImg {
	width: 124rpx;
	height: 124rpx;
	border-radius: 18rpx;
}
</style>

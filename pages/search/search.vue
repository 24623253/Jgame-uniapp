<template>
	<view class="">
		<!-- #ifdef MP -->
		<!-- 自定义导航 -->
		
		<view class="d-flex a-center px-2 b-box" style="width: 750rpx;height: 90rpx;">
			<view  class="flex-1 d-flex  a-center bg-light rounded " style="height: 65rpx;">
				<text @tap='search(searchNmae)' class="iconfont icon-sousuo px-2"></text>
				<input v-model="searchNmae" class="flex-1 d-flex  a-center  rounded   " style="height: 65rpx;" placeholder="搜索游戏"></input>
			</view>
			
			<view @tap='search(searchNmae)' class="d-flex j-center a-center pl-1" style="width: 85rpx;height: 90rpx;"><text>搜索</text></view>
		</view>
		
		<!-- #endif -->
		
		<view class='px-2'>
			<app-list :res='applist'></app-list>
			<view v-if="nullGame" class="mt-5 text-center">暂无相关游戏,敬请期待</view>
		</view>
		
	</view>
	
</template>

<script>
	import appList from '@/components/common/appList.vue'
	import {baseApi} from '@/setting.js'
	export default {
		components:{
			appList
		},
		data() {
			return {
				applist:[],
				nullGame:false,
				searchNmae:''
			};
		},
		onNavigationBarSearchInputChanged(e){
			console.log(e.text)
			this.searchNmae = e.text
		},
		onNavigationBarButtonTap(e){
			this.search(this.searchNmae)
		},
		methods:{
			search(name){
				this.$wxApi.loading('请稍后')
				console.log(name)
				this.$request.get(`/api/uni/app-game/list?name=${name}`).then((res)=>{
					const tempList = Object.assign([],res.data.records)
					this.nullGame = tempList.length ? false : true
					tempList.filter(item=>{
						item.src = baseApi + item.img
						// 判断手机本地是否已有该游戏
						// #ifndef MP||H5
						if(plus.runtime.isApplicationExist({pname:item.pname})) item.startAppBtn = true
						// #endif
					})
					this.applist = tempList
					this.$wxApi.loading()
				})
			}
		}
	}
</script>

<style lang="less">

</style>

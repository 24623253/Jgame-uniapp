<template>
	<view class="index">
		<!-- #ifdef MP -->
		<!-- 自定义导航 -->

		<view class="d-flex a-center" style="width: 750rpx;height: 90rpx;">
			<view @tap='navigationMsgClick' class="d-flex j-center a-center" style="width: 85rpx;height: 90rpx;"><text class="iconfont icon-lingdang"></text></view>
			<view @tap='navigationSearchClick' class="flex-1 d-flex  a-center bg-light rounded text-light-muted" style="height: 65rpx;">
				<text class="iconfont icon-sousuo mx-2"></text>
				搜索游戏
			</view>
			<view @tap='navigationDownClick' class="d-flex j-center a-center" style="width: 85rpx;height: 90rpx;"><text class="iconfont icon-xinbaniconshangchuan-"></text></view>
		</view>

		<!-- #endif -->

		<!-- 首页轮播组件 -->
		<swiper indicator-dots autoplay :interval="3000" :duration="200" circular style="height: 400rpx;width: 750rpx;">
			<swiper-item v-for="(item, index) in swipersIndex" :key="index" @click="clickSwiper(item.gameId)">
				<image :src="item.src" lazy-load style="width: 750rpx;height: 100%;" ></image>
			</swiper-item>
		</swiper>

		<!-- 首页分类组件 -->
		<view class="d-flex row m-3 " style="justify-content: space-around;">
			<block v-for="(item, index) in navIndex" :key="index">
				<view class="d-flex flex-column j-center a-center">
					<text @tap="navIconsClick(item)" class="iconfont navIcons" :class="item.icon" :style="{ 'background-image': item.bgColor }" style="background-image: linear-gradient(#e66465, #9198e5);"></text>
					<view class="">{{ item.name }}</view>
				</view>
			</block>
		</view>

		<!-- 卡片组件 + APPscrollX组件 -->
		<card headTitle="手游推荐" :headTitleWeight="false" :headBorderBottom="false">
			<text slot="right" class="main-text-color" @tap="moreTextClick('手游推荐',sytjList)">更多</text>
			<view slot="body" class="scrollIndex" getBodyClass='p-2'>
				<scroll-app-list :res='sytjList' ></scroll-app-list>
			</view>
		</card>
		<divider />
		
		<!-- 随机文字分类组件 -->
		<view class="d-flex p-2 gameClass">
			<block v-for="(item,index) in gameClass" :key='index' >
				<view class="gameClassItem p-2 font-sm" :style="{ 'color': item.color }" @tap='textTypeBtnClick(item.name)'>{{item.name}}</view>
			</block>
		</view>
		<view class="main-text-color font-sm mb-2 mr-3 d-flex j-end" @tap="getGameClass">换一批</view>
		<divider />
		
		<card headTitle="IP永流传" :headTitleWeight="false" :headBorderBottom="false">
			<text slot="right" class="main-text-color" @tap="moreTextClick('IP永流传',ipylcList)">更多</text>
			<view slot="body" class="scrollIndex" getBodyClass='p-2'>
				<scroll-app-list :res='ipylcList' ></scroll-app-list>
			</view>
		</card>
		<divider />
		
		
		<card headTitle="热玩好评游戏" :headTitleWeight="false" :headBorderBottom="false">
			<text slot="right" class="main-text-color" @tap="moreTextClick('热玩好评游戏',rwhpyxList)">更多</text>
			<view slot="body" class="scrollIndex" getBodyClass='p-2'>
				<scroll-app-list :res='rwhpyxList' ></scroll-app-list>
			</view>
		</card>
		<divider />
		
		
		<!-- 两张横版大图 -->
		
		<view class="d-flex p-2">
			<image class="mr-1 poster" src="../../static/poster/sgzj.jpg" mode="widthFix" lazy-load></image>
			<image class="ml-1 poster" src="../../static/poster/sgzj.jpg" mode="widthFix" lazy-load></image>
		</view>
		<divider />
		
		<!-- card + applist 组件 -->
		<card headTitle="一周热门" :headTitleWeight="false" :headBorderBottom="false">
			<text slot="right" class="main-text-color" @tap="moreTextClick('一周热门',yzrmList)">更多</text>
			<view slot="body" class="px-2">
				
				<app-list :res='yzrmList'></app-list>
				
			</view>
		</card>
		
		
	</view>
</template>

<script>
import {baseApi} from '@/setting'
import card from '../../components/common/card.vue';
import divider from '../../components/common/divider.vue';
import scrollAppList from '../../components/common/scrollAppList.vue';
import appList from '../../components/common/appList.vue'
export default {
	components: {
		card,
		divider,
		scrollAppList,
		appList
	},
	data() {
		return {
			list:[],
			// 头部分类
			navIndex: [
				{ name: '分类', icon: 'icon-ziyuan', bgColor: 'linear-gradient(#e66465, #9198e5)' },
				{ name: '排行', icon: 'icon-biaoqiankuozhan_paihang-389', bgColor: 'linear-gradient(#e66465, #9198e5)' },
				{ name: '专题', icon: 'icon-wujiaoxing', bgColor: 'linear-gradient(#e66465, #9198e5)' },
				{ name: '手游', icon: 'icon-shouji', bgColor: 'linear-gradient(#e66465, #9198e5)' }
			],
			// navIndex: [
			// 	{ name: '分类', icon: 'icon-ziyuan', bgColor: '#4CD964' },
			// 	{ name: '排行', icon: 'icon-biaoqiankuozhan_paihang-389', bgColor: '#E00165' },
			// 	{ name: '专题', icon: 'icon-wujiaoxing', bgColor: '#016EE0' },
			// 	{ name: '手游', icon: 'icon-shouji', bgColor: '#E09901' }
			// ],
			// 首页轮播
			swipersIndex: [],
			sytjList:[], // 手游推荐
			ipylcList:[], // IP永流传
			yxfxbList:[], // 游戏风向标
			rwhpyxList:[], // 热玩好评游戏
			yzrmList:[], // 一周热门
			// 横向滚动APPLIST
			// scrollGames:[
			// ],
			// 首页文字分类
			gameClass:[],
			gameClassTextColor:['#4CD964', '#0193E0', '#FF00C6', '#FFBC00', '#FF00F3'],
			// APPlist
			applist:[]
		};
	},
	created() {
		this.init()
		
	},
	
	// 头部导航点击
	onNavigationBarSearchInputClicked(e) {
		this.navigationSearchClick()
	},
	onNavigationBarButtonTap(e) {
		console.log(e.index)
		switch(e.index){
			case 0:
			console.log('消息')
			this.navigationMsgClick()
			break;
			case 1:
			console.log('下载')
			this.navigationDownClick()
			break;
			default:
			break;
		}
		// if(e.index == 0){
		// 	this.clickLeft()
		// } else {
		// 	this.clickRight()
		// }
	},
	
	onPullDownRefresh(success){
		//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
		this.init()
		setTimeout(function () {
		    uni.stopPullDownRefresh();	// 停止刷新动画
			uni.showToast({
				title:'刷新成功',
			})
		}, 1000);
	},
	
	methods: {
		init(){
			// 获取首页轮播图片
			this.getSwiper().then(res=>{
				this.swipersIndex = res
			})
			// 获取首页横向滚定游戏list
			this.getscrollGames()
			
			// 获取游戏类别文字
			this.getGameClass()
		},
		
		getSwiper() {
		     return new Promise((resolve, reject) => {
		        this.$request.get('/api/uni/swiper/list').then(res => {
		          const swipers = Object.assign([],res.data.records)
				  swipers.map((item)=>{
					  item.src = baseApi + item.img
				  })
		          resolve(swipers);
		        });
		      })
		    },
		
		getscrollGames(){
			this.$request.get('/api/uni/app-game/list').then(res=>{
				const list = Object.assign(res.data.records)
				list.map(item=>item.src = baseApi + item.img)
				this.list = list
				
				let sytjList = list.filter(item=> item.title === '手游推荐')
				this.sytjList = sytjList
				
				let ipylcList = list.filter(item=> item.title === 'IP永流传')
				this.ipylcList = ipylcList
				
				let rwhpyxList = list.filter(item=> item.title === '热玩好评游戏')
				this.rwhpyxList = rwhpyxList
				
				let yzrmList = list.filter(item=> item.title === '一周热门')
				// #ifndef MP||H5
				yzrmList.filter(item=>{
					if(plus.runtime.isApplicationExist({pname:item.pname})) item.startAppBtn = true
				})
				// #endif
				this.yzrmList = yzrmList
			})
		},
		
		// checkApp(item){
		// 	if(plus.runtime.isApplicationExist({pname:item.pname,action:'weixin://'})){
		// 		console.log(item.name + "已安装");
		// 		this.applist.push(item)
		// 	}else{
		// 		console.log(item.name + "未安装");
		// 		this.isDownBtn = false
		// 	}
		// },
		
		// 获取游戏类别 -> 文字类别按钮
		getGameClass(){
			this.$request.get('/api/uni/app-type/list').then(res => {
				const gameClass = Object.assign([],res.data.records)
				gameClass.map((item,index)=>{
					item.color = this.gameClassTextColor[Math.floor(Math.random() * 5)]
				})
				this.gameClass = gameClass.filter(item=>(item.name!=='nes游戏')&&(item.name!=='街机')&&(item.name!=='联机'))
			});
		},
		
		// 点击轮播
		clickSwiper(id) {
			uni.navigateTo({
				url:`../gameDetails/gameDetails?id=` + id
			})
		},
		
		// ICON分类点击
		navIconsClick(data) {
			if(data.name === '分类') return uni.navigateTo({
				url:'../gameClass/gameClass'
			})
			let props = JSON.stringify({type:data.name,navbar:true })
			uni.navigateTo({
				url:`../gameType/gameType?item=${encodeURIComponent(props)}`
			})
		},
		
		// 文字分类按钮点击
		textTypeBtnClick(name) {
			let list = this.list.filter(item=> item.type === name)
			let props = JSON.stringify({type:name,list:list })
			uni.navigateTo({
				// ${encodeURIComponent(props)页面跳转传输对象或过多数据时
				url:`../gameType/gameType?item=${encodeURIComponent(props)}`
			})
		},
		
		// 更多文字按钮
		moreTextClick(name,list){
			let props = JSON.stringify({type:name,list:list })
			uni.navigateTo({
				// 跳转页面传递数组或对象
				url:`../gameType/gameType?item=${encodeURIComponent(props)}`
			})
		},
		
		navigationMsgClick(){
			uni.navigateTo({
				url:'../message/message'
			})
		},
		
		navigationDownClick(){
			uni.navigateTo({
				url:'../down/down'
			})
		},
		
		navigationSearchClick(){
			uni.navigateTo({
				url:'../search/search'
			})
		},
		
	}
};
</script>

<style scoped>
/* 横向滚动,防止宽度过多溢出导致窗口抖动 */
.scrollIndex {
	width: 750rpx;
	overflow: hidden;
	scroll-y: auto;
}
	
.navIcons {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 50rpx;
	width: 100rpx;
	height: 100rpx;
	color: #f7f7f7;
	/* background-color: #4CD964; */
	/* background-color: #E00165; */
	/* background-color: #016EE0; */
	border-radius: 50%;
}

.gameClass{
	box-sizing: border-box;
	width: 750rpx;
	flex-wrap: wrap;
	overflow: hidden;
}
.gameClassItem{
	/* width: 100rpx; */
}

.poster{
	border-radius: 20rpx;
}

</style>

<template>
	<view>
		<!-- #ifdef MP -->
		<!-- 自定义导航 -->
		
		<!-- TODO: -->
		<!-- <view class="d-flex a-center" style="width: 750rpx;height: 90rpx;">
			<view @tap='navigationMsgClick' class="d-flex j-center a-center" style="width: 85rpx;height: 90rpx;"><text class="iconfont icon-lingdang"></text></view>
			<view @tap='navigationSearchClick' class="flex-1 d-flex  a-center bg-light rounded text-light-muted" style="height: 65rpx;">
				<text class="iconfont icon-sousuo mx-2"></text>
				搜索游戏
			</view>
			<view @tap='navigationDownClick' class="d-flex j-center a-center" style="width: 85rpx;height: 90rpx;"><text class="iconfont icon-xinbaniconshangchuan-"></text></view>
		</view> -->
		
		<!-- #endif -->
		
		<!-- 头部tabbar按钮组件 -->
		<view class="d-flex">
			<block v-for="(item,index) in tabbarBtn" :key='index'>
				<view class="d-flex a-center j-center w-50"  style="height: 80rpx;" :style="tabbarBtnActive === index ?'border-bottom: #0193E0 3px solid;':''" @tap='changeTab(index)'>
					<text :class="tabbarBtnActive === index ? 'main-text-color' :''" >{{item.name}}</text>
				</view>
			</block>
			
		</view>
		
		<!-- 对战游戏列表 -->
		<swiper  :duration="200" :current="tabbarBtnActive" circular :style="'height:'+scrollH+'px'" @change="changeSwiper">
			<swiper-item v-for="(item, index) in flihtGameList" :key="index" :id="item.id"  >
				<!-- 不嵌套scroll-view 微信小程序端只显示第一页轮播数据，APP端正常显示 -->
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'" @scrolltolower="loadmore(index)" :show-scrollbar="false">
					<template v-if="index===0">
						<view class="px-2">
							<app-list :res='item.gamelist'></app-list>
						</view>
					</template>
					<template v-else>
						<view class="b-box d-flex flex-wrap ">
							<!-- 游戏组件 -->
								<block v-for="(item1,index1) in item.gamelist" :key='index1'>
									<game :res="item1" ></game>
								</block>
						</view>
					</template>
				</scroll-view>
				
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	import {baseApi} from '@/setting'
	import game from '../../components/fight/game.vue'
	import appList from '@/components/common/appList.vue'
	export default {
		components:{
			game,appList
		},
		data() {
			return {
				scrollH:300, //容器剩余高度
				tabbarBtnActive:0,
				tabbarBtn:[
					{ name:'网络游戏', id:'0', },
					{ name:'单机游戏', id:'1', },
				],
				flihtGameList:[]
			}
		},
		created(){
			// 获取可是区域高度
			let res = uni.getSystemInfoSync()
			console.log(res,'<<<navigationBarHeight')
			// #ifndef MP
			let navbarH = uni.upx2px(80)
			// #endif
			// #ifdef MP
			let navbarH = uni.upx2px(100)
			console.log(navbarH)
			// #endif
			
			// #ifndef MP
				this.scrollH = res.windowHeight - res.statusBarHeight  - navbarH + 25
			// #endif
			   
			// #ifdef MP
			    this.scrollH = res.windowHeight - res.statusBarHeight -10 
			// #endif
			
			console.log(this.scrollH,res.windowHeight,res.screenHeight)
		},
		mounted() {
			this.init()
		},
		methods: {
			init(){
				// 获取对战数据
				this.$request.get('/api/uni/app-game/list').then(res =>{
					const list = Object.assign([],res.data.records)
					// list.map(item=>item.src = baseApi + item.img)
					list.filter(item=>{
						item.src = baseApi + item.img
						// 判断手机本地是否已有该游戏
						// #ifndef MP||H5
						if(plus.runtime.isApplicationExist({pname:item.pname})) item.startAppBtn = true
						// #endif
					})
					const wlyx = list.filter(item => item.online === 1 )
					const bdyx = list.filter(item => item.online === 0 )
					this.flihtGameList = [
						{gamelist:wlyx},{gamelist:bdyx}
					]
				})
			},
			changeTab(index){
				this.tabbarBtnActive = index
			},
			changeSwiper(e){
				this.changeTab(e.detail.current)
			},
			loadmore(e){
				console.log(e)
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
			
		}
	}
</script>

<style scoped>

</style>

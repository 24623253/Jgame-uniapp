<template>
	<view>
		
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x class="border-bottom scroll-row d-flex a-center" style="height: 44px;" :scroll-into-view="scrollinto"
		:scroll-with-animation="true" :show-scrollbar="false">
			<view class="scroll-row-item px-3"  v-for="(item,index) in gameClass" :key="index"
			:id="'tab'+index" @click="changeTab(index,item.id)">
				<text class="font-md" :class="tabIndex === index ? 'main-text-color':''">{{item.name}}</text>
			</view>
		</scroll-view>
		
		<swiper  :duration="200" :current="tabIndex" circular :style="'height:'+scrollH+'px'" @change="changeSwiper">
			
			<swiper-item v-for="(item, index) in gameClass" :key="index"   >
				<!-- 不嵌套scroll-view 微信小程序端只显示第一页轮播数据，APP端正常显示 -->
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'" @scrolltolower="loadmore(index)" :show-scrollbar="false">
					<view class="px-2">
						<!-- applist组件 -->
						<template v-if="item.gameList&&item.gameList.length>0">
							<app-list :res='item.gameList' ></app-list>
						</template>
						<template v-else>
							<view>此类游戏正在上架中,敬请期待！</view>
						</template>
						
					</view>
				</scroll-view>
				
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	import { baseApi } from '@/setting'
	import appList from '@/components/common/appList.vue'
	export default {
		components:{
			appList
		},
		data() {
			return {
				scrollinto:"",
				scrollH:300,
				gameClass:[],
				gameList:[],
				tabIndex:0,
			}
		},
		created() {
			// 获取可视区域高度
			let res = uni.getSystemInfoSync()
			// #ifndef MP
			let navbarH = 0
			// #endif
			// #ifdef MP
			let navbarH = uni.upx2px(90)  
			// #endif
			this.scrollH = res.screenHeight - 44 - 46 -res.statusBarHeight 
			this.init()
		},
		methods: {
			init(){
				this.getTabs().then((data)=>{
					this.getGameList(data)
				})
				
			},
			
			getTabs(){
				// 获取所有游戏类别。tabs
				return new Promise(resolve=>{
					this.$request.get('/api/uni/app-type/list').then(res => {
						const tempList = res.data.records.filter(item => (item.name!==('街机'))&&(item.name!=='联机')&&(item.name!=='nes游戏'))
						// this.gameClass = tempList
						resolve(tempList)
					});
				})
				
			},
			
			// TODO:获取所有游戏
			getGameList(data){
				// 接收所有游戏类别与所有游戏匹配组成二维数组
				this.$request.get(`/api/uni/app-game/list`).then(res=>{
					const tempList = Object.assign([],res.data.records)
					tempList.filter((item) =>{
						item.src = baseApi + item.img
						// 判断手机本地是否已有该游戏
						// #ifndef MP||H5
						if(plus.runtime.isApplicationExist({pname:item.pname})) item.startAppBtn = true
						// #endif
					})
					data.map((item, index)=>{
						item.gameList = []
						item.gameList.push(...(tempList.filter(item1=> item1.typeId === item.id)))
					})
					console.log(data)
					this.gameClass = data
				})
			},
			
			// 切换选项卡
			changeTab(index){
				// this.$wxApi.loading('请稍后...')
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index
				// 由于tabs过多，点击临界处可移动 scroll-view
				console.log()
				if((index-3)>0) {
					this.scrollinto = 'tab'+(index-3)
				}else{
					this.scrollinto = 'tab'+ 0
				}
				// if (this.newsitems[index].firstLoad === 'after') {
				// 	return;
				// }
				// this.getGameList(id)
			},
			
			// getGameList(id){
			// 	this.$request.get(`/api/uni/app-game/list?typeId=${id}`).then(res=>{
			// 		const tempList = res.data.records.filter((item) => item.src = baseApi + item.img)
			// 		this.gameList = tempList
			// 		this.$wxApi.loading()
			// 	})
			// },
			
			// 监听游戏列表swiper滑动
			changeSwiper(e){
				const index = e.detail.current
				this.changeTab(index)
			},
			
			// 加载更多，预留
			loadmore(){
				
			}
			
		}
	}
</script>

<style>

</style>

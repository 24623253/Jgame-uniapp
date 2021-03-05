<template>
	<view>
		<!-- 头部tabbar按钮组件 -->
		<view v-if="navbar" class="d-flex">
			<block v-for="(item,index) in tabbarBtn" :key='index'>
				<view class="d-flex a-center j-center w-50"  style="height: 80rpx;" :style="tabbarBtnActive === index ?'border-bottom: #0193E0 3px solid;':''" @tap='changeTab(index)'>
					<text :class="tabbarBtnActive === index ? 'main-text-color' :''" >{{item.name}}</text>
				</view>
			</block>
			
		</view>
		
		<!-- 对战游戏列表 -->
		<template v-if="title==='游戏分类'||title==='手游'||title==='排行'||title==='专题'" >
			<swiper  :duration="200" :current="tabbarBtnActive" circular :style="'height:'+scrollH+'px'" @change="changeSwiper">
				
				<swiper-item v-for="(item, index) in list" :key="index"   >
					<!-- 不嵌套scroll-view 微信小程序端只显示第一页轮播数据，APP端正常显示 -->
					<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'" @scrolltolower="loadmore(index)" :show-scrollbar="false">
						
						<template v-if="title==='专题'">
							<view class="d-flex p-3 flex-wrap j-sb">
								<!-- 游戏组件 -->
								<block v-for="(item1,index1) in item.gamelist" :key='index1'>
									<game :res="item1" ></game>
								</block>
							</view>
						</template>
						<template v-else>
							<view class="px-2">
								<!-- applist组件 -->
								<app-list :res='item.gamelist' ></app-list>
							</view>
						</template>
					</scroll-view>
					
				</swiper-item>
			</swiper>
		</template>
		
		<template v-else>
			<view class="px-2">
				<!-- applist组件 -->
				<app-list :res='propList' ></app-list>
			</view>
		</template>
		
		<!-- <view class="" style='height: 30rpx;'>
			<text>没有更多了</text>
		</view> -->
		
	</view>
</template>

<script>
	import {baseApi} from '@/setting'
	import game from '@/components/fight/game.vue'
	import appList from '@/components/common/appList.vue'
	export default {
		components:{
			game,appList
		},
		data() {
			return {
				scrollH:500, //容器剩余高度
				title:'',
				navbar:null,
				tabbarBtnActive:0,
				getlist:[],
				propList:[],
				tabbarBtn:[
					{ name:'动作', id:'0', },
					{ name:'策略', id:'1', },
				],
				list:[
					{gamelist:[
						{ src:'../../static/images/fightGame/xrxd.jpg', name:'雪人兄弟', id:'0' },
						{ src:'../../static/images/fightGame/xrxd.jpg', name:'雪人兄弟', id:'1' },
						{ src:'../../static/images/fightGame/rzljz3.jpg', name:'忍者龙剑传3', id:'2' },
						{ src:'../../static/images/fightGame/rzljz3.jpg', name:'忍者龙剑传3', id:'3' }
					],id:0},
					{gamelist:[
						{ src:'../../static/images/fightGame/hdl.jpg', name:'魂斗罗', id:'0' },
						{ src:'../../static/images/fightGame/hdl.jpg', name:'魂斗罗', id:'1' },
						{ src:'../../static/images/fightGame/cjml.jpg', name:'超级玛丽', id:'2' },
						{ src:'../../static/images/fightGame/rzljz3.jpg', name:'忍者龙剑传3', id:'3' }
					],id:1}
				]
			}
		},
		onLoad(option){
			if(!option) return
			const item = JSON.parse(decodeURIComponent(option.item));
			this.navbar = item.navbar?item.navbar:''
			let title = item.type === '分类'? '游戏'+item.type:item.type
			if(!item.list){
				this.getList().then(()=> this.init(title) )
			}else{
				this.propList = item.list
				this.init(title)
			}
		},
		created() {
			// 获取可是区域高度
			let res = uni.getSystemInfoSync()
			console.log(res.windowHeight,res.screenHeight,res.statusBarHeight)
			
			this.scrollH = res.screenHeight - 80 - 8 - res.statusBarHeight  // -tabbar - padding或者margin产生的高度 - 状态栏高度
			console.log(this.scrollH)
		},
		methods: {
			getList(){
				// 获取对战数据
				return new Promise((resolve,reject)=>{
					this.$request.get('/api/uni/app-game/list').then(res =>{
						console.log(res)
						const list = Object.assign([],res.data.records)
						list.map(item=>item.src = baseApi + item.img)
						this.getlist = list
						resolve()
					})
				})
				
			},
			
			init(title){
				// 动态更改bar文字
				this.title = title
				uni.setNavigationBarTitle({ title })
				console.log(title)
				switch(title){
					case'手游推荐':
						this.list = this.propList
						break
					case '游戏分类':
					this.tabbarBtn=[
						{ name:'动作', id:'0', },
						{ name:'策略', id:'1', },
					],
					this.list=[
						{gamelist:[
							{ src:'../../static/appIcon/jnbj.png', name:'江南百景1', online:true, type:'模拟战略', runmode:'ANDROID', language:'简体中文' },
							{ src:'../../static/appIcon/yxw.png', name:'游戏王', online:false, type:'卡牌游戏', runmode:'FC', language:'英文' },
							{ src:'../../static/appIcon/jqcm.png', name:'剑气除魔', online:true, type:'动作游戏', runmode:'ANDROID', language:'日文' },
							{ src:'../../static/appIcon/lol.png', name:'LOL', online:true, type:'动作游戏', runmode:'PC', language:'简体中文' },
							{ src:'../../static/appIcon/xdldl.png', name:'新斗罗大陆', online:true, type:'模拟战略', runmode:'ANDROID', language:'简体中文' }
						],id:0},
						{gamelist:[
							{ src:'../../static/appIcon/jnbj.png', name:'江南百景', online:true, type:'模拟战略', runmode:'ANDROID', language:'简体中文' },
							{ src:'../../static/appIcon/yxw.png', name:'游戏王', online:false, type:'卡牌游戏', runmode:'FC', language:'英文' },
							{ src:'../../static/appIcon/jqcm.png', name:'剑气除魔', online:true, type:'动作游戏', runmode:'ANDROID', language:'日文' },
							{ src:'../../static/appIcon/lol.png', name:'LOL', online:true, type:'动作游戏', runmode:'PC', language:'简体中文' },
							{ src:'../../static/appIcon/xdldl.png', name:'新斗罗大陆', online:true, type:'模拟战略', runmode:'ANDROID', language:'简体中文' }
						],id:1}
					]
					break;
					case '排行':
					this.tabbarBtn = [
						{ name:'周排行', id:'0', },
						{ name:'月排行', id:'1', },
						{ name:'好评榜', id:'2', }
					]
					const zph = this.getlist.filter(item => item.ranking === '周排行' )
					const yph = this.getlist.filter(item => item.ranking === '月排行' )
					const hpb = this.getlist.filter(item => item.ranking === '好评榜' )
					this.list = [
						{gamelist:zph},
						{gamelist:yph},
						{gamelist:hpb}
					]
					break;
					case '专题':
					this.tabbarBtn = [
						{ name:'nes游戏', id:'0', },
						{ name:'街机', id:'1', },
						{ name:'联机', id:'2', }
					]
					const nesyx = this.getlist.filter(item => item.type === 'nes游戏' )
					const jj = this.getlist.filter(item => item.type === '街机' )
					const lj = this.getlist.filter(item => item.type === '联机' )
					this.list = [
						{gamelist:nesyx},
						{gamelist:jj},
						{gamelist:lj}
					]
					break;
					case '手游':
					this.tabbarBtn = [
						{ name:'推荐', id:'0', },
						{ name:'最新', id:'1', },
						{ name:'热门', id:'2', }
					]
					const tj = this.getlist.filter(item => item.type === '推荐' )
					const zx = this.getlist.filter(item => item.type === '最新' )
					const rm = this.getlist.filter(item => item.type === '热门' )
					this.list = [
						{gamelist:tj},
						{gamelist:zx},
						{gamelist:rm}
					]
					break;
					default:
					this.tabbarBtn = [
						{ name:'推荐', id:'0', },
						{ name:'最新', id:'1', },
						{ name:'热门', id:'2', }
					]
					this.list = [
						{gamelist:[
							{ src:'../../static/appIcon/jnbj.png', name:'江南百景', online:true, type:'模拟战略', runmode:'ANDROID', language:'简体中文' },
							{ src:'../../static/appIcon/yxw.png', name:'游戏王', online:false, type:'卡牌游戏', runmode:'FC', language:'英文' },
							{ src:'../../static/appIcon/jqcm.png', name:'剑气除魔', online:true, type:'动作游戏', runmode:'ANDROID', language:'日文' },
							{ src:'../../static/appIcon/lol.png', name:'LOL', online:true, type:'动作游戏', runmode:'PC', language:'简体中文' },
							{ src:'../../static/appIcon/xdldl.png', name:'新斗罗大陆', online:true, type:'模拟战略', runmode:'ANDROID', language:'简体中文' }
						],id:0},
						{gamelist:[
							{ src:'../../static/appIcon/jnbj.png', name:'江南百景', online:true, type:'模拟战略', runmode:'ANDROID', language:'简体中文' },
							{ src:'../../static/appIcon/yxw.png', name:'游戏王', online:false, type:'卡牌游戏', runmode:'FC', language:'英文' },
							{ src:'../../static/appIcon/jqcm.png', name:'剑气除魔', online:true, type:'动作游戏', runmode:'ANDROID', language:'日文' },
							{ src:'../../static/appIcon/lol.png', name:'LOL', online:true, type:'动作游戏', runmode:'PC', language:'简体中文' },
							{ src:'../../static/appIcon/xdldl.png', name:'新斗罗大陆', online:true, type:'模拟战略', runmode:'ANDROID', language:'简体中文' }
						],id:1},
						{gamelist:[
							{ src:'../../static/appIcon/jnbj.png', name:'江南百景', online:true, type:'模拟战略', runmode:'ANDROID', language:'简体中文' },
							{ src:'../../static/appIcon/yxw.png', name:'游戏王', online:false, type:'卡牌游戏', runmode:'FC', language:'英文' },
							{ src:'../../static/appIcon/jqcm.png', name:'剑气除魔', online:true, type:'动作游戏', runmode:'ANDROID', language:'日文' },
							{ src:'../../static/appIcon/lol.png', name:'LOL', online:true, type:'动作游戏', runmode:'PC', language:'简体中文' },
							{ src:'../../static/appIcon/xdldl.png', name:'新斗罗大陆', online:true, type:'模拟战略', runmode:'ANDROID', language:'简体中文' }
						],id:2}
					]
					break
				}
			},
			changeTab(index){
				this.tabbarBtnActive = index
			},
			changeSwiper(e){
				this.changeTab(e.detail.current)
			},
			loadmore(e){
				console.log(e)
			}
		}
	}
</script>

<style scoped>

</style>

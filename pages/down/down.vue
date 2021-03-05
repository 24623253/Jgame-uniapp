<template>
	<view class="px-2">
		
		<template v-if="userinfo">
			<app-list :res='applist' :downloaded="true"></app-list>
		</template>
		
		<template v-else>
			<view class="d-flex j-center mt-5">
				<text>请先登陆哦~</text>
			</view>
		</template>
		
	</view>
</template>

<script>
	import appList from '@/components/common/appList.vue'
	import { baseApi } from '@/setting.js'
	export default {
		components:{
			appList
		},
		data() {
			return {
				// APPlist
				userinfo:'',
				applist:[]
			}
		},
		onLoad() {
			this.userinfo = this.$store.getters.userInfo ? this.$store.getters.userInfo : ''
			if(this.userinfo) {
				// #ifndef MP||H5
				this.getList().then(res=>{
					console.log(res)
					res.map(item=>{
						this.checkApp(item)
					})
				})
				// #endif
				// #ifdef MP||H5
				this.applist = [
					{ id:'18635b10-7412-11eb-b38b-9f9335080f87', src:'../../static/appIcon/jnbj.png', name:'江南百景', online:true, type:'模拟战略', runmode:'ANDROID', language:'简体中文' },
					{ id:'0ae2b430-75b2-11eb-b65a-07743a5d09f5', src:'../../static/appIcon/yxw.png', name:'游戏王', online:false, type:'卡牌游戏', runmode:'FC', language:'英文' }
				]
				// #endif
			}
		},
		methods: {
			
			getList(){
				return new Promise((resolve, reject)=>{
					this.$request.get('/api/uni/app-game/list').then((res)=>{
						const temList = Object.assign([], res.data.records)
						temList.filter(item=> item.src = baseApi + item.img)
						resolve(temList)
					})
				})
				
			},
			
			checkApp(item){
				if(plus.runtime.isApplicationExist({pname:item.pname,action:'weixin://'})){
					console.log(item.name + "已安装");
					this.applist.push(item)
				}else{
					console.log(item.name + "未安装");
					this.isDownBtn = false
				}
			}
		}
	}
</script>

<style>

</style>

<template>
	<view>
		<view class="head">
			<image class="position-absolute" style="top: 0; left: 0; right: 0; height: 375rpx; z-index: -9;" src="../../static/images/adminBg.jpg"  lazy-load=""></image>
			
			<!-- 头部icon -->
			<view class="d-flex j-sb pt-5 px-3 text-white">
				<text class="iconfont icon-lingdang" style="font-size: 50rpx;" @tap='navigationMsgClick'></text>
				<!-- #ifndef MP -->
				<text class="iconfont icon-xinbaniconshangchuan-" style="font-size: 50rpx;" @tap="navigationDownClick"></text>
				<!-- #endif -->
			</view>
			
			<!-- 用户信息简略 -->
			<view class="d-flex j-sb b-box pt-5 pl-5 pr-2">
				<view class="d-flex">
					<view class="adminHead text-center">
						<text v-if="!userInfo.name" class="iconfont icon-wode1 text-white adminHeadImg"></text>
						<image v-else :src="userInfo.headImg||userInfo.headimgurl" mode="widthFix" class="adminHeadImg" lazy-load ></image>
					</view>
					<view class="d-flex flex-column text-white mt-2 ml-4">
						<text class="d-block" @tap='loginClick(userInfo)'>{{userInfo.name||'点我登录哦~'}}</text>
						<text class="d-block font-sm sign text-center mt-1 p-0" @tap='sign'>签到</text>
					</view>
				</view>
				<text class="iconfont icon-ziyuanjk d-flex a-center more mr-2" @tap='moreSet(userInfo)'></text>
			</view>
		</view>
		
		
		<!-- 用户菜单 top-->
		<view class="row bg-color-white b-box my-1" >
			<block v-for="(item,index) in topMenus" :key='index'>
				<!-- 菜单卡片组件 -->
				<admin-menus :res='item' ></admin-menus>
			</block>
		</view>
		
		<!-- center -->
		<view class="row bg-color-white b-box mb-1" >
			<block v-for="(item,index) in centerMenus" :key='index'>
				<admin-menus :res='item' :bgcolor="centerMenusIconClolr" ></admin-menus>
			</block>
		</view>
		
		<!-- bottom -->
		<view class="row bg-color-white b-box" >
			<block v-for="(item,index) in bottomMenus" :key='index'>
				<admin-menus :res='item' :bgcolor="bottomMenusIconClolr" ></admin-menus>
			</block>
		</view>
		
	</view>
</template>

<script>
	import adminMenus from '../../components/common/adminMenu.vue'
	export default {
		components:{
			adminMenus
		},
		data() {
			return {
				userInfo:'',
				topMenus:[
					{ name:'兑换商城', icon:'icon-lipin' },
					{ name:'游戏试玩', icon:'icon-youxi1' }
				],
				
				centerMenus:[
					{ name:'管理存档', icon:'icon-yunyingpan' },
					{ name:'模拟器管理', icon:'icon-youxi-' },
					{ name:'资源分享', icon:'icon-shangchuan' },
					{ name:'游戏收藏', icon:'icon-shouc' },
					{ name:'游戏互传', icon:'icon-xianghujiaohuan' },
					{ name:'购买的游戏', icon:'icon-lipin' },
					{ name:'我的好友', icon:'icon-wodehaoyou' }
				],
				centerMenusIconClolr:'#0193E0',
				
				bottomMenus:[
					{ name:'设置', icon:'icon-shezhi' },
					{ name:'分享小鸡', icon:'icon-fenxiang' },
					{ name:'关于&升级', icon:'icon-guanyu' },
					{ name:'建议反馈', icon:'icon-jianyi' }
				],
				bottomMenusIconClolr:'#1AA034',
			}
		},
		mounted() {
			
		},
		onShow() {
			this.userInfo = this.$store.getters.userInfo?this.$store.getters.userInfo:'',
			console.log(this.userInfo)
		},
		methods: {
			loginClick(userInfo){
				console.log(userInfo)
				if(!userInfo.name){
					uni.navigateTo({
						url:'../login/login'
					})
				}
			},
			
			sign(){
				this.userInfo.name ? this.$wxApi.toast('签到成功') : this.$wxApi.toast('登陆后才能签到哦~')
			},
			
			moreSet(userInfo){
				if(!userInfo) return this.$wxApi.toast('请登录')
				uni.navigateTo({
					url:'../../pages/setting/setting'
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
			
		}
	}
</script>

<style >
page{
	background-color: #F0F0F0;
}
</style>

<style scoped>
.head{
	height: 375rpx;
}
.adminHead{
	width: 125rpx;
	height: 125rpx;
	border-radius: 50%;
	background: rgba(234,234,234,0.2);
}
.adminHeadImg{
	font-size: 80rpx;
	border-radius: 50%;
}
.sign{
	border: #FFFFFF solid 1px;
	border-radius: 15rpx;
	width: 120rpx;
}
.more{
	color: #d7d9d7;
	font-size: 32rpx;
}
</style>

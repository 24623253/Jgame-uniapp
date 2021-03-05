<template>
	<view class="w-100 b-box">
		<block v-for="(item,index) in res" :key='index'>
			<view style="height: 180rpx;" class="b-box d-flex a-center j-sb">
				<view class="d-flex" @tap='appClick(item.id)' >
					<!-- image外尽量不要套view。会造成不可名状的CSS问题，有默认空间 -->
					<image :src="item.src"  style="width: 132rpx;height: 132rpx;" ></image>
					<view class="pl-4 b-box">
						<view class="">{{item.name}}</view>
						<view class="font-sm">
							<text>92.8M</text>
							<text class="pl-2" style="color: #1AA034;">{{item.online?'网游':''}}</text>
							<text class="ml-2 pl-2 border-left" >{{item.heat?item.heat+'	热度':''}}</text>
						</view>
						<view class="font-sm"><text style="color: #FD6801;">{{item.type}}</text><text class="pl-2 main-text-color">{{item.support}}</text><text class="pl-2">{{item.language}}</text></view>
					</view>
				</view>
				<view class="d-flex a-center" v-if="btnShow">
					<button v-if="item.startAppBtn" class="font-sm main-bg-color1 downBtn" @tap='startApp(item)'>启动</button>
					<button v-else-if="!downloaded" class="font-sm main-bg-color downBtn" @tap='downApp(item)'>下载</button>
					<!-- <button  class="font-sm main-bg-color downBtn" @tap='downApp(item)'>下载</button> -->
					<button v-else class="font-sm main-bg-color1 downBtn" @tap='startApp(item)'>启动</button>
				</view>
			</view>
			<divider v-if="dividerShow" />
		</block>
	</view>
</template>

<script>
	import divider from '../../components/common/divider.vue';
	export default{
		components:{
			divider
		},
		props:{
			res:{
				type:Array,
				// default:[]
			},
			// 是否已经下载
			downloaded:{
				type:Boolean,
				default:false
			},
			// 是否隐藏按钮
			btnShow:{
				type:Boolean,
				default:true
			},
			// 是否隐藏下划线
			dividerShow:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			downApp(item){
				this.appClick(item.id)
			},
			
			startApp(item){
				
				// #ifndef MP||H5
				// 判断平台
				if (plus.os.name == 'Android') {
					plus.runtime.launchApplication(
						{ pname: item.pname },
						function(e) {
							this.$wxApi.toast( item.name + '未安装或启动失败')
						}
					);
					this.$wxApi.loading();
				} else if (plus.os.name == 'iOS') {
					// TODO: ios暂时打开应用市场 后续待后台添加app包名
					plus.runtime.openURL('itms-apps://' + 'itunes.apple.com/cn/app/wechat/id414478124?mt=8');
				}
				// #endif
				
				// #ifdef MP||H5
				this.$wxApi.toast('小程序及H5端仅供展示哦，如需启动或下载请打开APP哦~')
				// #endif
			},
			
			appClick(id){
				uni.navigateTo({
					url:'../../pages/gameDetails/gameDetails?id=' + id
				})
			}
		}
	}
</script>

<style scoped>

</style>

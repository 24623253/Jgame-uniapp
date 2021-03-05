<template>
	<view class="mb-5">
		<view class="head">
			<image class="position-absolute" style="top: 0; left: 0; right: 0; height: 375rpx; z-index: -9;" src="../../static/images/adminBg.jpg"
			 lazy-load></image>

			<!-- 头部icon -->
			<view class="d-flex j-sb px-3 text-white headIcon">
				<text @tap="goBack" class="iconfont icon-fanhui"></text>
				<!-- #ifndef MP||H5 -->
				<text class="iconfont icon-xinbaniconshangchuan-" @tap="navigationDownClick"></text>
				<!-- #endif -->
			</view>

			<!-- 用户信息简略 -->
			<view class="d-flex j-sb b-box pt-5 pl-5 pr-2">
				<view class="d-flex">
					<view class="adminHead text-center">
						<image class="adminHeadImg" src="../../static/images/head/xjDefault.png" mode="widthFix" lazy-load />
					</view>
					<view class="d-flex flex-column text-white mt-2 ml-3">
						<text class="d-block">小鸡推荐~</text>
						<text class="d-block font-sm  text-center mt-1 p-0">{{ details.updateTime }}</text>
					</view>
				</view>
				<view class="text-white mt-1 mr-2 text-center">
					<!-- <text class="iconfont icon-redupaixu d-flex a-center mr-2 d-block"></text> -->
					<text class="iconfont icon-redupaixu mb-0" style="font-size: 45rpx;"></text>
					<text class="font-sm d-block">{{ details.heat }}</text>
				</view>
			</view>
		</view>

		<!-- 中间内容 -->
		<view class="cont">
			<!-- 基本信息 -->
			<view class="px-2 pb-2 bg-white">
				<app-list :res="appList" :btnShow="false" :dividerShow="false"></app-list>

				<!-- 标签组件 -->
				<view>
					<!-- <block v-for='(item,index) in tagList' :key='index'> -->
					<tag :res="details.tag"></tag>
					<!-- </block> -->
				</view>
			</view>

			<!-- 轮播组件 -->
			<swiper class="mb-2" indicator-dots autoplay :interval="3000" :duration="200" circular :style="'height:'+swiperHeight+'px;'+'width: 750rpx;'" >
				<swiper-item v-for="(item, index) in swipers" :key="index">
					<image :src="item" lazy-load style="width: 750rpx;" mode="widthFix"></image>
				</swiper-item>
			</swiper>

			<!-- 游戏介绍 -->
			<view class="mb-2 pb-2 bg-white">
				<card headTitle="游戏介绍" :headTitleWeight="false" :headBorderBottom="false">
					<view slot="body" class="font-sm px-2">{{ details.introduce }}</view>
				</card>

				<!-- <view class="main-text-color font-sm  mr-3 d-flex j-end" @tap="presentationd = !presentationd" v-text="presentationd ? '收起' : '显示全部'"></view> -->
			</view>

			<!-- 详细信息 -->
			<view class="pb-2 mb-2 bg-white">
				<card headTitle="详细信息" :headTitleWeight="false" :headBorderBottom="false">
					<view slot="body" class="font-sm px-2">
						<block v-for="(item, index) in gameDetails" :key="index">
							<view class="font-sm">
								<text class="d-inline-block text-light-muted" style="width: 130rpx;text-align: right;">{{ item.name }}</text>
								<text class="pl-2">{{ item.content }}</text>
							</view>
						</block>
					</view>
				</card>
			</view>

			<!-- 大家还看过 -->
			<!-- 卡片组件 + APPscrollX组件 -->
			<view class="pb-2 mb-2 bg-white">
				<card headTitle="大家还看过" :headTitleWeight="false" :headBorderBottom="false">
					<view slot="body" class="scrollIndex" getBodyClass="p-2">
						<scroll-app-list :res="scrollGames"></scroll-app-list>
					</view>
				</card>
			</view>
		</view>

		<!-- 底部按钮 -->
		<view class="position-fixed left-0 bottom-0 right-0 px-3 py-1 border-top bg-white">
			<!-- #ifndef MP||H5 -->
			<button class="footDownBtn font " :class="isDownBtn? 'main-bg-color':'main-bg-color1'" @tap="down">
				{{isDownBtn?'下载':'启动'}}
			</button>
			<!-- #endif -->

			<!-- #ifdef MP||H5 -->
			<button class="footDownBtn font main-bg-color" @tap="downMH">
				下载
			</button>
			<!-- #endif -->

		</view>
	</view>
</template>

<script>
	import appList from '@/components/common/appList.vue';
	import tag from '@/components/common/tag.vue';
	import card from '@/components/common/card.vue';
	import scrollAppList from '@/components/common/scrollAppList.vue';
	import {
		baseApi
	} from '@/setting';
	export default {
		components: {
			appList,
			tag,
			card,
			scrollAppList
		},
		data() {
			return {
				details: {},
				appList: [{
					src: '../../static/appIcon/jnbj.png',
					heat: '500',
					name: '江南百景',
					online: true,
					type: '模拟战略',
					runmode: 'ANDROID',
					language: '简体中文'
				}],
				swiperHeight:'', // swiper高度
				tagList: ['口袋妖怪', '热门'],
				// 轮播
				swipers: [],
				// 游戏详细信息
				gameDetails: [{
						name: '更新信息',
						content: '2020-06-18 10:00'
					},
					{
						name: '当前版本',
						content: '0.1.430'
					},
					{
						name: '模拟器',
						content: 'ANDROID'
					},
					{
						name: '游戏类型',
						content: '动作游戏'
					},
					{
						name: '语言',
						content: '简体中文'
					},
					{
						name: '支持',
						content: ''
					}
				],
				// 游戏介绍展开
				presentationd: false,
				// 横向滚动APPLIST
				scrollGames: [],
				isDownBtn: true
			};
		},
		onLoad(option) {
			this.getDetails(option.id);
			this.getDjhzkGameList()
		},
		methods: {
			// 判断第三方程序(微信) 是否安装
			checkApp(item) {
				if (plus.runtime.isApplicationExist({
						pname: item.pname,
						action: 'weixin://'
					})) {
					// 两个参 pname 检测安卓 action检测IOS
					this.isDownBtn = false
				} else {
					this.isDownBtn = true
				}
			},

			getDjhzkGameList() {
				this.$request.get('/api/uni/app-game/list').then(res => {
					const temList = Object.assign([], res.data.records)
					temList.map(item => item.src = baseApi + item.img)
					this.scrollGames = temList
				})
			},

			getImgH(src) {
				var that = this
				uni.getImageInfo({
					src: src,
					success: function(image) {
						console.log(image.height,'<<<<image.height')
						uni.getSystemInfo({
							success: function(res) {
								console.log(res)
								that.swiperHeight = res.windowWidth / image.width * image.height;
								console.log(that.swiperHeight)
								
								// res.windowWidth:屏幕可视宽度
								// image.width :uni.getImageInfo获取到的图片宽度
								// image.height :uni.getImageInfo获取到的图片高度
								
								// 使用uni.getImageInfo 获取的图片宽高是原始宽高 所以需要与设备可视宽度进行等比例计算
								
								// 此方法不解决数组内的图片高度不一的情况
							}
						});
					}
				});
			},

			getDetails(id) {
				// 获取详情

				this.$request.get(`/api/uni/app-game/list?id=${id}`).then(res => {
					const details = Object.assign({}, res.data);

					// 检测手机是否存在此APP
					// #ifndef MP||H5
					this.checkApp(details)
					// #endif

					this.details = details;
					this.gameDetails = [{
							name: '更新信息',
							content: details.updateTime
						},
						{
							name: '当前版本',
							content: details.versions
						},
						{
							name: '模拟器',
							content: details.support
						},
						{
							name: '游戏类型',
							content: details.type
						},
						{
							name: '语言',
							content: details.language
						},
						{
							name: '支持',
							content: details.support
						}
					];
					let swipers = [];
					details.swipers.map((item, index) => swipers.push(baseApi + item));
					console.log(swipers[0])
					this.getImgH(swipers[0])
					this.swipers = swipers;
					this.appList = [{
						src: baseApi + details.img,
						heat: details.heat,
						name: details.name,
						online: details.online,
						type: details.type,
						support: details.support,
						language: details.language
					}];
				});
			},

			presentationdBtn() {},

			// mp和h5端下载
			downMH() {
				this.$wxApi.toast('小程序端及H5端仅供展示哦,如需下载或启动请下载APP~')
			},

			down() {
				if (this.isDownBtn) {
					plus.runtime.openURL(this.details.href ? this.details.href : 'https://uniapp.dcloud.io/h5')
				} else {
					this.$wxApi.loading('请稍后...');

					// 判断平台
					if (plus.os.name == 'Android') {
						plus.runtime.launchApplication({
								pname: this.details.pname
							},
							function(e) {
								console.log('应用打开失败错误信息: ' + e.message);
								this.$wxApi('应用未安装或应用打开失败')
							}
						);
						this.$wxApi.loading();
					} else if (plus.os.name == 'iOS') {
						// ios打开应用市场
						plus.runtime.openURL('itms-apps://' + 'itunes.apple.com/cn/app/wechat/id414478124?mt=8');
					}
				}

			},

			navigationDownClick() {
				uni.navigateTo({
					url: '../down/down'
				})
			},

			goBack() {
				uni.navigateBack();
			}
		}
	};
</script>

<style>
	page {
		background-color: #f0f0f0;
	}
</style>

<style scoped lang="less">
	.head {
		height: 375rpx;
	}

	.adminHead {
		width: 125rpx;
		height: 125rpx;
		border-radius: 50%;
		background: rgba(234, 234, 234, 0.2);
	}

	.adminHeadImg {
		border-radius: 50%;
	}

	.headIcon {
		padding-top: 80rpx;

		text {
			font-size: 45rpx;
		}
	}

	.footDownBtn {
		height: 70rpx;
		line-height: 70rpx;
		color: #ffffff;
		border-radius: 10rpx;
	}
</style>

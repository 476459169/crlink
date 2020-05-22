<template>
	<view class="container">
		<swiper :indicator-dots="true" :autoplay="true" indicator-active-color="#ee7b5e">
			<swiper-item v-for="(item, index) in banner" :key="index">
				<image class="swiper-item" :src="'http://api.crlink.com/'+item.imgUrl" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="navbar">
			<view class="navbar-item">
				<image class="thumb" src="../../static/image/home/course.png" mode="aspectFit"></image>
				<view class="title">课 程</view>
			</view>
			<view class="navbar-item">
				<image class="thumb" src="../../static/image/home/find.png" mode="aspectFit"></image>
				<view class="title">证书查询</view>
			</view>
			<view class="navbar-item">
				<image class="thumb" src="../../static/image/home/exam.png" mode="aspectFit"></image>
				<view class="title">考 试</view>
			</view>
		</view>

		<view class="panel">
			<view class="panel__hd">
				<image class="icon" src="../../static/image/mine/education@2x.png" mode=""></image>
				<view class="title">临语堂课程</view>
				<view class="more">MORE+</view>
			</view>
			<view class="panel__bd">
				<view class="course" v-for="(item, index) in course" :key="index" @click="itemClcik(item)">
					<image :src="'http://api.crlink.com/'+item.collegeImgUrl" class="itemImage"></image>
					<view class="itemContent">
						<view style="font-size: 17px;">
							{{item.collegeName}}
						</view>
						<view style="color: #666666; font-size: 16px;">
							包含：{{item.courseCount}}节
						</view>
						<view style="display: flex;">
							<view class="text_money">
								¥{{item.collegeFee}}
							</view>
							<view class="text_xh">
								¥{{item.originalCollegeFee}}
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner: [],
				course: []
			}
		},
		onLoad() {
			this.getAdImage()
			this.getIndexCourse()
		},
		
		onPullDownRefresh: function() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		
		onReachBottom: function() { //当划到最底部的时候触发事件
			 console.log("我是最底部了"); 
		},
		methods: {
			getAdImage() {
				this.$api.post('index!ajaxGetAdImage.action').then(res => {
					if (res.res.status == 0) {
						this.banner = res.inf.arr
					}
				})
			},
			getIndexCourse() {
				this.$api.post('index!ajaxGetIndexCollege.action').then(res => {
					if (res.res.status == 0) {
						this.course = res.inf.arr
					} 
				})
			},

			itemClcik(item) {
				console.log("itemid = "+item.id);
				uni.navigateTo({
					url: './videoDetail?courseID='+item.id,
					success() {
						
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 320upx;

		.swiper-item {
			width: 100%;
			height: 100%;
			background-color: #000000;
		}
	}



	.navbar {
		display: flex;
		text-align: center;
		align-items: center;
		background-color: #FFFFFF;

		.navbar-item {
			padding: 40upx 30upx;
			flex: 1;
			box-sizing: border-box;

			.thumb {
				width: 40upx;
				height: 40upx;
				vertical-align: middle;
				// background-color: #000;
			}

			.title {
				margin-top: 10upx;
				font-size: 28upx;
			}
		}

	}

	.panel {
		margin-top: 10upx;
		background-color: #FFFFFF;

		.panel__hd {
			padding: 30upx;
			display: flex;
			align-items: flex-end;

			.icon {
				height: 40upx;
				width: 40upx;
				// background-color: #000000;
			}

			.title {
				flex: 1;
				margin-left: 10upx;
				line-height: 40upx;
				font-weight: bold;
				font-size: 34upx;
			}

			.more {
				font-size: 24upx;
			}
		}
	}

	.itemImage {
		padding: 7.5upx 15upx;
		width: 40%;
		height: 90px;
	}


	.itemContent {
		padding: 10upx 10upx;
		width: 60%;
		background-color: #FFFFFF;
		display: block;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden
	}


	.panel__bd {
		padding: 0upx 30upx;
	}

	.course {
		padding: 20upx 0upx;
		display: flex;
	}


	.text_money {
		color: #fd6666;
		font-size: 16px;
	}

	.text_xh {
		padding-left: 10px;
		padding-top: 2px;
		color: #666666;
		font-size: 14px;
		text-decoration: line-through
	}
</style>

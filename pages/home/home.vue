<template>
	<view class="container">
		<swiper :indicator-dots="true" :autoplay="true" indicator-active-color="#ee7b5e">
			<swiper-item v-for="(item, index) in banner" :key="index">
				<image class="swiper-item" :src="'http://api.crlink.com/'+item.imgUrl" mode="widthFix"></image>
			</swiper-item>
		</swiper> 
		<view class="navbar">
			<view class="navbar-item" @click="cousersClick()">
				<image class="thumb" src="../../static/image/home/course.png" mode="aspectFit"></image>
				<view class="title">课 程</view>
			</view>
			<view class="navbar-item" @click="vertSearch()">
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
					<image :src="baseurl+item.collegeImgUrl" class="itemImage"></image>
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
	var _this; 
	var timer = null;
	export default {
		data() {
			return {
				banner: [],
				course: [],
				 
				page:1,
				baseurl:"http://39.105.48.243:8080/crlink/"
			}
		},
		onLoad() {
			_this = this
			this.getAdImage() 
			this.getIndexCourse(this.page)
		
		},
		onShow() {
			this.getuserInfo()
		},
		
		onPullDownRefresh: function() {
			this.page = 1;
			this.getIndexCourse(this.page) 
			
		},
		
		onReachBottom: function() { //当划到最底部的时候触发事件
			 if (timer != null) { //加载缓冲延迟
			 	clearTimeout(timer);
			 }
			 timer = setTimeout(function() {
			 	_this.getIndexCourse(_this.page);
			 }, 600); 
		},
		methods: {
			
			getuserInfo(){
				// 
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('user!ajaxGetUserInfo.action',{loginKey:loginkey}).then(res => {
					if (res.res.status == 0) {
						
					}else{
						uni.removeStorageSync('loginKey');
						uni.removeStorageSync('userId');
					}
				})
			},
			getAdImage() {
				this.$api.post('index!ajaxGetAdImage.action').then(res => {
					if (res.res.status == 0) {
						this.banner = res.inf.arr
					}
				})
			},
			getIndexCourse(e) {
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('index!ajaxGetIndexCollege.action',{firstIndex:e,loginKey:loginkey}).then(res => {
					if (res.res.status == 0) {
						
						 
						if (e == 1) {
							this.course = res.inf.arr
							_this.page++;
						}else{
							if (e <= res.inf.pageCount) {
								_this.course = _this.course.concat(res.inf.arr); //进行数据的累加
								_this.page++; //页数的++
								_this.loading = "加载更多";
								}else{
									uni.showToast({
										title: '没有更多了！'
									});
								}
						}
					} 
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh(); //数据加载完成,刷新结束
				})
			},
			
			cousersClick(){
				var loginkey = uni.getStorageSync('loginKey');
				if(loginkey.length>0){
					uni.navigateTo({
						url: './cousers/cousers',
						success() {
							
						}
					})
				}else{
					uni.navigateTo({
						url: '../mine/login',
						success() {
							
						}
					})
				}
			},
 
			itemClcik(item) {
				
					var loginkey = uni.getStorageSync('loginKey');
				if(loginkey.length>0){
					uni.navigateTo({
						url: './college?collegeId='+item.id,
						success() {
							
						}
					})
				}else{
					uni.navigateTo({
						url: '../mine/login',
						success() {
							
						}
					})
				}
				

			},
			
				
			vertSearch(){
				uni.navigateTo({
					url:'./certSeach'
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
		width: 370upx;
		height: 180upx;
	}


	.itemContent {
		padding: 10upx 10upx;
		width: calc(100vw - 370upx);
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
		color: #e8654b;
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

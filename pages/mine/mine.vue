<template>
	<view>
		<view class="topview" v-if="islogin">
			<image class="topimage" src="../../static/image/home/bgmine@2x.png" mode="scaleToFill"></image>
			<image class="setting" src="../../static/image/mine/setting@2x.png" mode="" @click="settting()"></image>
			<!-- <image class="mesg" src="../../static/image/mine/notification@2x.png" mode=""></image> -->
			<image class="userimage" :src="userInfo.imgUrl?baseUrl+userInfo.imgUrl:'../../static/image/mine/default_head_img@2x.png' " mode="" v-on:click="login()"></image>
			<view class="userName">{{userInfo.nickName}}</view>
		</view>
		<view class="topview" v-else>
			<image class="topimage" src="../../static/image/home/bgmine@2x.png" mode="scaleToFill"></image>
			<image class="setting" src="../../static/image/mine/setting@2x.png" mode="" @click="settting()"></image>
			<!-- <image class="mesg" src="../../static/image/mine/notification@2x.png" mode=""></image> -->
			<image class="userimage" src="../../static/image/mine/default_head_img@2x.png" mode="" v-on:click="login()"></image>
			<view class="userName">登录/注册</view>
		</view>
		<view class="listView">
			<view class="">
				<view class="listView_item" style="margin-top: 0upx;">
					<image class="icon1" src="../../static/image/mine/buyCourse@2x.png" mode=""></image>
					<view class="title">已购买课程</view>
					<image class="more" src="../../static/image/mine/cerarrow@2x.png" mode=""></image>
				</view>
			</view>
			<view style="margin-top: 20upx;">
				<view class="listView_item" @click="studyRecord()">
					<image class="icon1" src="../../static/image/mine/myquest@2x.png" mode=""></image>
					<view class="title">学习记录</view>
					<image class="more" src="../../static/image/mine/cerarrow@2x.png" mode=""></image>
				</view>
				<view class="listView_item" @click="watchRecord()">
					<image class="icon1" src="../../static/image/mine/watchRecord@2x.png" mode=""></image>
					<view class="title">观看记录</view>
					<image class="more" src="../../static/image/mine/cerarrow@2x.png" mode=""></image>
				</view>
			</view>
			<view style="margin-top: 20upx;">
				<view class="listView_item" @click="myCert()">
					<image class="icon1" src="../../static/image/mine/cername@2x.png" mode=""></image>
					<view class="title">我的证书</view>
					<image class="more" src="../../static/image/mine/cerarrow@2x.png" mode=""></image>
				</view>

			</view>

			<view style="margin-top: 20upx;">
				<view class="listView_item">
					<image class="icon1" src="../../static/image/mine/teacherCreditworthiness@2x.png" mode=""></image>
					<view class="title">关于我们</view>
					<image class="more" src="../../static/image/mine/cerarrow@2x.png" mode=""></image>
				</view>
			</view>
			<view style="margin-top: 20upx;" v-if="islogin">
				<view class="listView_item" @click="logOut">

					<view style="text-align: center;width: 100%;font-size: 34upx; color: #666666;">退出登录</view>

				</view>

			</view>
			
            

		</view>

		<!-- <view class=""></view> -->
		
		<!-- <uni-popup ref="popup" type="center" message="确定退出" @confirm="confirm">退出</uni-popup> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				islogin:false,
				userInfo:Object,
				baseUrl:"http://39.105.48.243:8080/crlink/"
			}
		},
		onLoad() {
			console.log("onload")
			
		},
		onShow() {
			this.getuserInfo()
		},
		methods: {
			
			getuserInfo(){
				var that = this;
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('user!ajaxGetUserInfo.action',{loginKey:loginkey}).then(res => {
					if (res.res.status == 0) {
						that.userInfo = res.inf
						that.islogin = true;
					}else{
						that.islogin = false;
						uni.removeStorageSync('loginKey');
						uni.removeStorageSync('userId');
					}
				})
			},
			login() { 
				var loginkey = uni.getStorageSync('loginKey');
				if(loginkey.length>0){
					uni.navigateTo({
						url:'./setting'
					})
				}else{
					uni.navigateTo({
						url: './login',
						success: res => {
							console.log("navitologin")
						}
					});
					
				}
				
				

			},
				
			logOut(){
				// this.islogin = false;
				// uni.removeStorageSync("loginKey");
				var that = this;
				uni.showModal({
				    title: '提示',
				    content: '确定退出',
				    success: function (res) {
				        if (res.confirm) {
							
							// uni.removeStorageaSync("loginKey");
							uni.removeStorage({
								key:"loginKey",
								success() {
										console.log("点击了退出");
									that.islogin = false;
								}
							})
						
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			
			settting(){
					var loginkey = uni.getStorageSync('loginKey');
					console.log("loginkey =" +loginkey );
					if(loginkey){
					   uni.navigateTo({
					   	url:'./setting',
						success() {
							
						}
					   })
					}else{
						uni.navigateTo({
							url:'./login'
						})
					}
			},
			
				
			watchRecord(){
				var loginkey = uni.getStorageSync('loginKey');
				console.log("loginkey =" +loginkey );
				if(loginkey){
				   uni.navigateTo({
				   	url:'./watchRecord/watchRecord',
					success() {
						
					}
				   })
				}else{
					uni.navigateTo({
						url:'./login'
					})
				}
			},
			studyRecord(){
				var loginkey = uni.getStorageSync('loginKey');
				console.log("loginkey =" +loginkey );
				if(loginkey){
				   uni.navigateTo({
				   	url:'./studyRecord/studyRecord',
					success() {
						
					}
				   })
				}else{
					uni.navigateTo({
						url:'./login'
					})
				}
			},
			
				
			myCert(){
				
				var loginkey = uni.getStorageSync('loginKey');
				console.log("loginkey =" +loginkey );
				if(loginkey){
				   uni.navigateTo({
				   	url:'./myCertificate',
					success() {
						
					}
				   })
				}else{
					uni.navigateTo({
						url:'./login'
					})
				}
			}
			
		
		}
	}
</script>

<style lang="scss">
	.topview {
		padding-top: 0upx;
		height: 550upx;
		width: 100%;
		background-color: #FFFFFF;
		position: relative;

		.topimage {
			width: 100%;
			height: 100%;
		}

		.setting {
			position: absolute;
			top: 100upx;
			left: 30upx;
			width: 40upx;
			height: 40upx;
			z-index: 5;
		}

		.mesg {
			position: absolute;
			top: 100upx;
			right: 30upx;
			width: 40upx;
			height: 40upx;
			z-index: 5;
		}

		.userimage {
			position: absolute;
			width: 200upx;
			height: 200upx;
			border-radius: 100upx;
			z-index: 7;
			right: 50%;
			top: 50%;
			margin-top: -100upx;
			margin-right: -100upx;

		}

		.userName {
			position: absolute;
			padding: 20upx 0;
			height: 40upx;
			width: 200upx;
			text-align: center;
			top: 50%;
			right: 50%;
			margin-top: 100upx;
			margin-right: -100upx;
			font-size: 28upx;
			color: #FFFFFF;
		}

	}

	.listView {
		// margin-top: 0upx;
	}



	.listView_item {
		display: flex;
		padding: 40upx;
		height: 50upx;
		margin-top: 1upx;
		align-items: center;
		background-color: #FFFFFF;
		;

		.icon1 {
			height: 50upx;
			width: 50upx;
		}

		.title {
			flex: 1;
			margin-left: 10upx;
			line-height: 40upx;
			// font-weight: bold;
			font-size: 28upx;
			color: #666666;
		}

		.more {
			height: 30upx;
			width: 15upx;
		}
	}
</style>

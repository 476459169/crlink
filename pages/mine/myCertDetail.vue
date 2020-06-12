<template>
	<view class="">

		<view class="background_view">
			<view class="title_view flex_view" >
				<image class="title_image" src="../../static/image/myCertif/tb.png" mode=""></image>
				<view class="">
					{{data.name}}
				</view>
			</view>

			<view class="flex_view item">
				<image class="item_image" src="../../static/image/myCertif/certBH.png" mode=""></image>
				<view class="item_title">证书编号:</view>
				<view class="">{{data.certNo}}</view>
			</view>
			<view class="flex_view item">
				<image class="item_image" src="../../static/image/myCertif/certLX.png" mode=""></image>
				<view class="item_title">证书类型:</view>
				<view class="">{{data.certType}}</view>
			</view>
			<view class="flex_view item">
				<image class="item_image" src="../../static/image/myCertif/certXM.png" mode=""></image>
				<view class="item_title">姓名:</view>
				<view class="">{{data.userName}}</view>
			</view>

			<view class="flex_view item">
				<image class="item_image" src="../../static/image/myCertif/certJG.png" mode=""></image>
				<view class="item_title">颁发机构:</view>
				<view class="">{{data.organization}}</view>
			</view>

			<view class="flex_view item">
				<image class="item_image" src="../../static/image/myCertif/certSJ.png" mode=""></image>
				<view class="item_title">颁发时间:</view>
				<view class="">{{data.awardTime}}</view>
			</view>

			<view class="flex_view item">
				<image class="item_image" src="../../static/image/myCertif/certZP.png" mode=""></image>
				<view class="item_title">证书照片:</view>
			</view>

			<view class="cert_View"  >
				<image class="cert_image" :src="baseUrl+data.imgUrl" mode=""  @click="saveImage()" ></image>
			</view>

			<view class="bottom_text">
				点击图片保存到相册查看大图
			</view>
			
			<view class="topright">
				<image class="topright_image" src="../../static/image/myCertif/xj.png" mode=""></image>
			</view>
		</view>


		
 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				data: Object,
				baseUrl: "http://39.105.48.243:8080/crlink/"
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.getNetDetail(this.id)
		},

		methods: {
			getNetDetail(e) {
				// user!ajaxGetCertDetail.action
				var that = this;
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('user!ajaxGetCertDetail.action', {
					loginKey: loginkey,
					id: that.id
				}).then(res => {
					if (res.res.status == 0) {
						that.data = res.inf

					} else {
						uni.showToast({
							title: res.res.errMsg
						})
					}
				})
			},



			/****长按保存图片 */
			saveImage() {
				let that = this
				console.log("save");
				wx.getSetting({
					success(res) {
						//未授权 先授权 然后保存
						if (!res.authSetting['scope.writePhotosAlbum']) {
							wx.authorize({
								scope: 'scope.writePhotosAlbum',
								success(re) {
									that.saveToBlum();
								}
							})
						} else {
							//已授 直接调用保存到相册方法
							that.saveToBlum();
						}
					}
				})
			},

			//保存网络图片到相册方法
			saveToBlum: function() {
				wx.downloadFile({
					url: this.baseUrl + this.data.imgUrl,
					success: function(res) {
						wx.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(result) {
								wx.showToast({
									title: '保存成功',
									icon: 'success'
								})
							}
						})
					}
				})
			},



		}


	}
</script>

<style lang="scss">
	.background_view {
		background-color: #FFFFFF;
		margin: 20px 15px;
		position: relative;
	}

	.flex_view {
		display: flex;
		align-items: center;
	}

	.title_view {
		font-size: 18px;
		color: #e8654b;

		.title_image {
			padding: 20px 15px;
			margin-left: 20px;
			width: 90px;
			height: 120px;
		}
	}


	.item {
		padding: 0px 10px;
		font-size: 13px;
		color: #666666;

		.item_image {
			width: 20px;
			height: 20px;
			padding: 5px;
		}

		.item_title {
			width: 80px;
		}

		.item_content {
			margin-right: 5px;
		}

	}

	.cert_View {
		padding: 10px 15px 5px 15px;

		.cert_image {
			width: 100%;

		}
	}
	.bottom_text{
		font-size: 12px;
		color: #e8654b;
		padding: 0px 20px 20px 0px;
		text-align: right;
	}
	
	.topright{
		position: absolute;
		right: 0px;
		top: -1px;
		
		.topright_image{
			width: 30px;
			height: 20px;
		}
	}
</style>

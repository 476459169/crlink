<template>
	<view>
		<view class="topView">
			<image class="topImage" src="../../../static/Icon-180.png" mode=""></image>
		</view>

		<view class="listView">


			<view class="cell" @click="companyClick()">
				<view class="list_title">
					公司介绍
				</view>
				<image class="list_image" src="../../../static/image/mine/cerarrow@2x.png" mode=""></image>
			</view>
			<view class="line"></view>
			<view class="cell" @click="callUS()">
				<view class="list_title">
					联系我们
				</view>
				<image class="list_image" src="../../../static/image/mine/cerarrow@2x.png" mode=""></image>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: ''
			};
		},
		onLoad() {

		},

		methods: {


			companyClick() {
				console.log('jumptocompany');
				// uni.navigateTo({
				// 	url:'companyIntroduction'
				// })
				uni.navigateTo({
					url: './companyIntroduction',
					success: res => {
						console.log("navitologin")
					}
				});
			},

			callUS() {
				uni.showModal({
					showCancel: false,
					title: '联系我们',
					content: '您可以通过拨打临语堂客服电话135-2180-9828联系我们，或通过发送电子邮件到linxiaomei@crlink.com,反馈您的意见和建议。',
					confirmText: '好的',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						}
					}

				})
			}
		}


	}
</script>

<style lang="scss">
	.topView {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}


	.topImage {
		width: 300upx;
		height: 300upx;
		padding: 30px 0px;
	}

	.listView {
		background-color: #FFFFFF;

		.cell {
			display: flex;
			align-items: center;

			.list_title {
				flex: 1;
				font-size: 14px;
				color: #666666;
				padding: 5px 15px;
			}

			.list_image {
				width: 5px;
				height: 10px;
				margin-right: 15px;
			}

		}


		.line {
			background-color: #e6e6e6;
			height: 1px;
			width: 97.5%;
			margin-left: 2.5%;

		}

	}
</style>

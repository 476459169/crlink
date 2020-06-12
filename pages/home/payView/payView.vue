<template>

	<view class="main">
		<view style="position: absolute;top: 0px;width: 100%;height: 1px;background-color: #eceff3;"></view>
		<view class="topview">
			<image :src="baseUrl+myData.imgUrl" mode=""></image>
			<view class="top_content">
				<view class="title">
					{{title}}
				</view>
				<view class="money_text">
					￥{{price}}
				</view>
			</view>
		</view>

		<view class="textview">
			<text style="font-size: 15px; font-weight: bold;">入学权益\n</text>
			<text>*课程有效期至{{myData.expirationDate}}\n*课程安排解锁权归临语堂所有\n</text>
		</view>


		<view class="bottomView" @click="topay()">
			<view class="buybtn">
				立即购买
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				collegeId: '',
				courseId: '',
				myData: Object,
				baseUrl: "http://39.105.48.243:8080/crlink/",
			}
		},
		onLoad(e) {
			_this = this;
			_this.collegeId = e.collegeId
			_this.courseId = e.courseId

			if (_this.collegeId) {
				_this.getCollegeMes()
			}
			if (_this.courseId) {
				_this.getCourseMes()
			}

		},
		methods: {
			getCollegeMes() {
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('college!ajaxGetCollegeDetailNew.action', {
					collegeId: _this.collegeId,
					loginKey: loginkey,
				}).then(res => {
					if (res.res.status == 0) {
						_this.myData = res.inf;
					} else {
						uni.showToast({
							title: res.res.error
						})
					}
				})
			},
			getCourseMes() {
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('index!ajaxGetCourseDetailNew.action', {
					id: _this.courseId,
					loginKey: loginkey,
				}).then(res => {
					if (res.res.status == 0) {
						_this.myData = res.inf;
					} else {
						uni.showToast({
							title: res.res.error
						})
					}
				})
			},
			topay() {

				let that = this
				var openId;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log('loginRes=' + loginRes.code);
						let code = loginRes.code;

						
						uni.request({
							url: 'http://39.105.48.243:8080/crlink/pay/wxPay!ajaxGetOpenId.action',
							data: {
								code:code
							},
							success: (res) => {
								
								console.log('openid = '+ res.data.inf.openid);
								let  openId = res.data.inf.openid
								if (res.data.res.status == 0) {
									if (_this.courseId) {
										//单课支付
										var loginkey = uni.getStorageSync('loginKey');
										
										uni.request({
											url: 'http://39.105.48.243:8080/crlink/pay/wxPay!ajaxBuyCourse.action',
											data: {
												id: _this.courseId?_this.courseId:_this.collegeId,
												loginKey: loginkey,
												tradeType: 'JSAPI',
												openId: openId
											},
											success: (res) => {
												console.log("ajaxBuyCourse"+res.data);
												_this.wxpay(res.data.inf)
											}
										})
									} else {
										//课程支付
										console.log("kecheng");
										var loginkey = uni.getStorageSync('loginKey');
									
										uni.request({
											url: 'http://39.105.48.243:8080/crlink/pay/wxPay!ajaxBuyCourseCollege.action',
											data: {
												id: _this.courseId?_this.courseId:_this.collegeId,
												loginKey: loginkey,
												tradeType: 'JSAPI',
												openId: openId
											},
											success: (res) => {
												_this.wxpay(res.data.inf)
											}
										})
									}
									
								}
							}
						})
						
						// that.$api.post('', {
							
						// 	code: code
						// }).then(res => {
							
						// })



					}
				})


			},

			wxpay(dict) {

				console.log("dict timestamp= " + dict.timeStamp);
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: dict.timeStamp,
					nonceStr: dict.nonceStr,
					package: dict.package,
					signType: 'MD5',
					paySign: dict.paySign, 
					success: function(res) {
						console.log('success:000' + JSON.stringify(res));
						uni.showToast({
							title:"购买成功",
							duration:1000,
							complete() {
								uni.navigateBack({
									delta:1,
								})
							}
						})
						
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
			}

		},

		computed: {
			title() {
				if (_this.collegeId) {
					return _this.myData.collegeName

				} else {
					return _this.myData.title
				}
			},

			price() {
				if (_this.collegeId) {
					return _this.myData.collegeFee

				} else {
					return _this.myData.buyPrice
				}
			}

		}

	}
</script>

<style lang="scss">
	.main {
		background-color: #FFFFFF;


	}

	.topview {
		display: flex;
		padding: 20px;

		image {

			height: 60px;
			width: 100px;
		}

		.top_content {
			margin-left: 10px;
			flex: 1;

		}

		.title {
			font-size: 14px;
		}

		.money_text {
			margin-top: 15px;
			color: #e8654b;
			font-size: 14px;
		}
	}


	.textview {
		padding: 20px;

	}

	.bottomView {

		// position: relative;
		// height: 45px;
		.buybtn {
			position: absolute;
			bottom: 0px;
			width: 100%;
			height: 45px;
			text-align: center;
			line-height: 45px;
			background-color: #e8654b;
			color: #FFFFFF;
			font-size: 15px;
		}
	}
</style>

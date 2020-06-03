<template>
	<view class="bd">
		<view style="margin-top: 100upx;">
			<view class="item">
				<image src="../../static/image/mine/phone@2x.png" mode=""></image>
				<input class="item_ct" type="text" value="" placeholder="手机号" maxlength="11" v-model="phoneNum" />
			</view>
			<view class="line"></view>
			<view class="item">
				<image src="../../static/image/mine/yzm@2x.png" mode=""></image>
				<input class="item_ct" type="text" value="" placeholder="验证码" maxlength="11" v-model="VerificationCode" />
				<button class="yz" type="default" @click="getVerificationCode" :disabled="disabled">{{VerificationMes}} </button>
			</view>
			<view class="line"></view>

			<view style="margin-top: 100upx;">
				<view class="logbtn" v-on:click="registclick">注册</view>
			</view>
			<view class="checkItem">
				<checkbox-group @change="checkboxchange" style="width: 60upx;">
					<label style="color: #666666;">
						<checkbox value="cb" color="#ee7b5e" />
					</label>
				</checkbox-group>

				<view style="color: #666666;" @click="jumpToxy">我已阅读并同意《用户注册协议》</view>
			</view>

		</view>


	</view>
</template>

<script>
	export default {

		data() {
			return {
				checkStatus: false,
				phoneNum: null,
				VerificationCode: null,
				VerificationMes: "获取验证码",
				disabled: false
			}
		},

		methods: {


			checkboxchange(e) {
				var values = e.detail.value;
				if (values.length > 0) {
					console.log("xz")
					this.checkStatus = true;
				} else {
					console.log("wxz")
					this.checkStatus = false;
				}

			},

			getVerificationCode() {


				if (!this.phoneNum||this.phoneNum.length!==11 ) {
					uni.showToast({
						title: '请输入正确的手机号！'
					});
				} else {
					var ii = 0;
					this.disabled = true;
					this.VerificationMes = "60s";
					this.timer = setInterval(() => {
					
						ii = ii + 1;
						console.log("ii=" + ii);
						this.VerificationMes = (60 - ii).toString() + "s";
					
						if (ii == 30) {
							this.disabled = false;
							this.VerificationMes = "获取验证码";
							ii = 0;
							clearInterval(this.timer);
						}
					}, 1000)
					
					this.$api.post('login!ajaxGetPhoneCode.action',{tel:this.phoneNum}).then(res=>{
						if (res.res.status == 0) {
							console.log("获取验证码成功")
						}
					})
					
				}

			},


			registclick() {
				if (this.checkStatus) {

					if (this.phoneNum.length == 11 && this.VerificationCode.length > 0) {
						// console.log("手机号"+this.phoneNum+"yzm"+this.VerificationCode)
						this.$api.post('login!ajaxReg.action', {
							tel: this.phoneNum,
							phoneCode: this.VerificationCode
						}).then(res => {
							if (res.res.status == 0) {
								
								//注册成功 调用登录接口
								this.$api.post('login!ajaxLogin.action', {
									tel: this.phoneNum,
									phoneCode: this.VerificationCode
								}).then(res => {
									if (res.res.status == 0) {
										var dict = res.inf;
									
										uni.setStorage({
											key:"user",
											data:dict,
											success() {
												uni.showToast({
													title: '注册成功！登录中···'
												});
												setTimeout(function() {
													uni.navigateBack({
														delta: 2
													})
												}, 1500)
											}
										})
										
										
									}

								})


							} else {
								uni.showToast({
									title: '注册失败！'
								});
							}
						})
					} else {
						uni.showToast({
							title: '请检查填写项！'
						});
					}

				} else {
					uni.showToast({
						title: '需要勾选阅读并同意《用户注册协议》'
					});
				}
			},


			jumpToxy() {
				uni.navigateTo({
					url: './UserRegistrationAgreement',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	.bd {
		margin-top: 0upx;
		width: 100%;
		height: 100%;
	}

	.item {
		display: flex;
		height: 60upx;
		padding: 0upx 20upx;
		margin-top: 50upx;
		align-items: center;
		box-sizing: border-box;

		image {
			padding-left: 40upx;
			// padding-top: 40upx;
			height: 40upx;
			width: 35upx;
		}

		.item_ct {
			flex: 1;
			margin-left: 10upx;
			line-height: 40upx;
			font-size: 28upx;
			color: #666666;

		}
		.yz {
			color: #fd6666;
			font-size: 24upx;
			margin-right: 20upx;
			width: 200upx;
		}
	}

	

	// button::after{ border: none; }
	.line {
		width: 90%;
		height: 2upx;
		margin-left: 5%;
		background-color: #e6e6e6;
	}

	.logbtn {
		background-color: #ee7b5e;
		color: #FFFFFF;
		font-size: 30upx;
		padding: 20upx 0upx;
		width: 90%;
		margin-left: 5%;
		text-align: center;
		font-weight: bold;

	}


	.registbtn {
		background-color: transparent;
		color: #ee7b5e;
		font-size: 30upx;
		padding: 20upx 0upx;
		width: 90%;
		margin-left: 5%;
		text-align: center;
		font-weight: bold;
		border-color: #666666;
		border-width: 1upx;
	}


	.checkItem {
		margin-top: 30upx;
		margin-left: 5%;
		display: flex;
	}
</style>

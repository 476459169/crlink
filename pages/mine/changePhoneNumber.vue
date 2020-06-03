<template>
	<view class="bd">
		<view style="margin-top: 100upx;">
			<view class="item">
				<image src="../../static/image/mine/phone@2x.png" mode=""></image>
				<input class="item_ct" type="text" value="" placeholder="请输入您的新手机号" maxlength="11" v-model="newPhoneNum" />
			</view>
			<view class="line"></view>
			<view class="item">
				<image src="../../static/image/mine/phone@2x.png" mode=""></image>
				<input class="item_ct" type="text" value="" placeholder="请输入您的旧手机号" maxlength="11" v-model="phoneNum" />
			</view>
			<view class="line"></view>
			<view class="item">
				<image src="../../static/image/mine/yzm@2x.png" mode=""></image>
				<input class="item_ct" type="text" value="" placeholder="验证码" maxlength="11" v-model="VerificationCode" />
				<button class="yz" type="default" @click="getVerificationCode" :disabled="disabled">{{VerificationMes}} </button>
			</view>
			<view class="line"></view>
			
			<text class="ts">*请注意查收您新手机号上的验证码</text>

			<view style="margin-top: 100upx;">
				<view class="logbtn" @click="binding()">绑定手机</view>
			</view>


		</view>


	</view>
</template>

<script>
	export default {

		data() {
			return {
				phoneNum: null,
				newPhoneNum:null,
				VerificationCode: null,
				
				VerificationMes: "获取验证码",
				disabled: false
			}
		},



		methods: {


			getVerificationCode() {
				if (!this.phoneNum || this.phoneNum.length !== 11) {
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

					this.$api.post('login!ajaxGetPhoneCode.action', {
						tel: this.phoneNum,
					}).then(res => {
						if (res.res.status == 0) {
							console.log("获取验证码成功")
						}
					})

				}

			},
				
			binding(){
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('user!updateUserTel.action',{
					loginKey:loginkey,
					tel:this.phoneNum,
					editTel:this.newPhoneNum,
					phoneCode:this.VerificationCode
					}).then(res => {
					if (res.res.status == 0) {
						uni.showToast({
							title:'换绑成功'
						})
						uni.setStorageSync('userId', res.inf.userId);
						uni.setStorageSync('loginKey', res.inf.loginKey);
						uni.navigateBack({delta: 1})
					}else{
					uni.showToast({
						title:res.res.errMsg
					})
					}
				})
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
		box-sizing: border-box;
		align-items: center;

		image {
			padding-left: 40upx;
			// padding-top: 40upx;
			height: 40upx;
			width: 30upx;
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
			padding-right: 5%;
			border: none;;
		}

	}

	

	.line {
		width: 90%;
		height: 1upx;
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
	
	.ts{
		color: #e8654b;
		font-size: 12px;
		padding: 20px;
	}
</style>

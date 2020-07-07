<template>
	<view class="">
		<view class="listView">
			<image class="listView_img" src="../../static/image/myCertif/cerIcon@2x.png" mode=""></image>
			<view class="listView_content">
				<view class="content_title">
						{{data.name}}
				</view>
				<view class="content_center">
					<view class="center_text">
						{{data.certNo}}
					</view>
				</view>
			</view>
			<view class="center_bz">
				{{data.certType}}
			</view>
		</view>
		<view class="cert_section">
			证书相关信息
		</view>
		<view class="cert_mesg">
			<view class="mesg_item">证书所属人：{{data.userName}}</view>
			<view class="mesg_item">颁发机构：{{data.organization}}</view>
			<view class="mesg_item">证书颁发日期：{{data.awardTime}}</view>
			<view class="mesg_item">证明人：{{data.zmName}}</view>
		</view>
		<view class="cert_section">
			证书照片
		</view>
		
		<view class="bottom_Imgview">
			<image class="cert_img" :src="baseUrl + data.imgUrl" mode="aspectFill"></image>
		</view>
		
	</view>
</template>

<script>
	var self;
	export default{
			
		data(){
			return{
				id:'',
				data:Object,
				baseUrl:"http://39.105.48.243:8080/crlink/"
			}
		},
		onLoad(e) {
			self = this
			self.id = e.id
			self.baseUrl =  getApp().globalData.baseUrl
			self.getData()
		},
		methods:{
			getData(){
				let loginkey = uni.getStorageSync('loginKey')
				this.$api.post('user!ajaxGetCertDetail.action', {
					loginKey: loginkey,
					id:self.id
				
				}).then(res => {
					if(res.res.status==0)
					self.data = res.inf
					})
			}
		}
	}
</script>

<style lang="scss">
	.listView {
		margin-top: 1px;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
	
		.listView_img {
			padding: 15px;
			width: 30px;
			height: 35px;
		}
	
		.listView_content {
			flex: 1;
			padding: 10px 0px;
			display: flex;
			flex-direction: column;
			justify-content: center;
	
			.content_title {
				font-size: 16px;
				color: #333333;
	
			}
	
			.content_center {
	
				display: flex;
				color: #666666;
				font-size: 14px;
	
				.center_text {
					flex: 1;
				}
	
			
			}
			
			
	
			.content_name {
				color: #666666;
			}
		}
		
		.center_bz {
			margin-right: 10px;
			border: 1px solid #e8654b;
			border-radius: 5px;
			width: 60px;
			height: 25px;
			color: #e8654b;
			font-size: 13px;
			text-align: center;
			line-height: 25px;
		}
	
	
	}
	
	.cert_section{
		padding: 10px;
		width: 100%;
		background-color: #f5f5f5;
		font-size: 14px;
	}
	
	.cert_mesg{
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 15px;
		font-size: 14px;
		background-color: #FFFFFF;
		.mesg_item{
			line-height: 25px;
			color: #666666;
			
			
		}
	}
	
	.bottom_Imgview{
		background-color: #FFFFFF;
		width: 100%;
		display: flex;
		justify-content: center;
		.cert_img{
			margin: 15px;
		}
	}
	
	
</style>

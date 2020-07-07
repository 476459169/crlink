<template>
		<view class="panel__bd">
			<view class="course" v-for="(item, index) in dataArr" :key="index" @click="itemClcik(item)">
				<image :src="baseUrl+item.collegeUrl" class="itemImage"></image>
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
</template>

<script>
	var	 _this;
	export default{
		data() {
			return{
				id:'',
				dataArr:[],
				baseUrl: "http://39.105.48.243:8080/crlink/"
			}
		},
		onLoad(e) {
			_this = this;
			this.id = e.id
			this.baseUrl =  getApp().globalData.baseUrl
			this.getMoreCollege()
		},
		
		methods:{
				
			getMoreCollege(){
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('index!ajaxGetMoreCollege.action', {
					id: _this.id,
					loginKey: loginkey,
				}).then(res => {
					if (res.res.status == 0) {
						_this.dataArr = res.inf.arr;
					}else{
						uni.showToast({
							title:res.res.error
						})
					}
				})
			},
			itemClcik(item){
				uni.navigateTo({
					url:'./college?collegeId='+item.collegeId
				})
			}
		}
	}
	
</script>

<style lang="scss">
	.panel__bd {
		padding: 0upx 10upx;
		// background-color: #FFFFFF;
	}
	
	.course {
		padding: 2upx 0upx;
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
	.itemContent {
		padding: 10upx 10upx;
		width: 60%;
		background-color: #FFFFFF;
		display: block;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden
	}
	.itemImage {
		padding: 7.5upx 15upx;
		width: 40%;
		height: 90px;
	}
	
</style>

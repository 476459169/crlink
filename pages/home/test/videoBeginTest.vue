<template>
	<view class="">
		<view class="title">
			考试名称：{{dataArr.examName}}
		</view>
		
		<!-- <view class="flex_item">
			<image class="flex_img" src="../../../static/image/mine/studyImg.png" mode=""></image>
			<view class="flex_text">考试开始时间：{{dataArr.startTime}}</view>
		</view>
		<view class="flex_item">
			<image class="flex_img" src="../../../static/image/mine/studyImg.png" mode=""></image>
			<view class="flex_text">考试结束时间：{{dataArr.endTime}}</view>
		</view> -->
		<view class="flex_item">
			<image class="flex_img" src="../../../static/image/mine/studyImg.png" mode=""></image>
			<view class="flex_text">总  分：{{dataArr.examTotalScore}}分</view>
		</view>
		<view class="flex_item">
			<image class="flex_img" src="../../../static/image/mine/studyImg.png" mode=""></image>
			<view class="flex_text">合格分数：{{dataArr.examPassScore}}分</view>
		</view>
		<view class="flex_item">
			<image class="flex_img" src="../../../static/image/mine/studyImg.png" mode=""></image>
			<view class="flex_text">考试次数：{{dataArr.testRemainTimes}}次</view>
		</view>
		
		<view class="flex_item" style="margin-top: 20px; color: #666666;">
			考试须知：
		</view>
		<view class="flex_item">
			1.考试过程中退出视为放弃考试
		</view>
		
		<view class="bottomBtn" @click="beginTest()">
			开始考试
		</view>
	</view>
</template>

<script>
	let _this;
	export default {
		data() {
			return {
				examId: '',
				dataArr: Object,
			}
		},
		onLoad(e) {
			_this = this
			this.examId = e.examId
			console.log("examid = "+this.examId);
		},
		
		onShow() {
			console.log("onShow");
			this.getData(this.examId)
		},

		methods: {

			getData(examid) {
				let loginKey = uni.getStorageSync('loginKey')
				this.$api.post('college!ajaxGetExamDetail.action', {
					loginKey: loginKey,
					examId: examid
				}).then(res => {
					if (res.res.status == 0) {
						_this.dataArr = res.inf;
						console.log("this.dataarr = "+_this.dataArr);
					}

				})
			},
			beginTest(){
				
				if(_this.dataArr.testRemainTimes ==0){
					uni.showToast({
						title:"考试次数为0，无法继续考试！"
					})
				}else{
					uni.navigateTo({
						url:'./videoTestDetail?examId='+_this.examId
					})
				}
				
				// let loginKey = uni.getStorageSync('loginKey')
				// this.$api.post('exam!ajaxIsCanStartExam.action', {
				// 	loginKey: loginKey,
				// 	examId: _this.examId
				// }).then(res => {
				// 	if (res.res.status == 0) {
				// 		uni.navigateTo({
				// 			url:'./testDetail?examId='+_this.examId
				// 		})
				// 	}else{
				// 		uni.showToast({
				// 			title:res.res.errMsg
				// 		})
				// 	}
				
				// })
				
				
				
			}
		}
	}
</script>

<style lang="scss">
	
	.title{
		margin-top: 10px;
		padding: 10px 15px;
		color: #666666;
		font-size: 16px;
		
	}
	
		
	.flex_item{
		padding: 5px 15px;
		display: flex;
		align-items: center;
		justify-content: left;
		color: #666666;
		font-size: 14px;
		.flex_img{
			width: 15px;
			height: 15px;
		}
		
		.flex_text{
			margin-left: 10px;
			line-height: 20px;
			
			
		}
	}
	
	.bottomBtn{
		position: fixed;
		bottom: 15px;
		left: 5%;
		width: 90%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #FFFFFF;
		background-color: #e8654b;
		font-size: 15px;
	}
</style>

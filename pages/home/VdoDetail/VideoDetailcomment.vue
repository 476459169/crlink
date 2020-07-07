<template>

	<view style="background-color: #FFFFFF;">


		<view style="position: absolute;top: 0px;width: 100%;height: 1px;background-color: #eceff3;"></view>
		<view class="topTitle">
			评论该课程
		</view>

		<view class="startView">
			<image class="start_plate" :src="index<=selectStartIndex?'../../../static/image/home/vdodetail/star_o.png':'../../../static/image/home/vdodetail/star_g.png'"
			 mode="" v-for="(item,index) in startArr" @key="index" @click="startClick(index)"></image>
		</view>

		<view class="textView">
			<textarea class="text_a" v-model="textValue" value="textValue" maxlength='200' placeholder="说一下对课程评价或建议" />
			<view class="bottomtextview">
				<text>{{textValue.length}}</text>/200
			</view>
		</view>
		<view class="commitView">
			<button class="commitBtn" type="default" @click="commit()" >提交</button>
		</view>
		
		
		
		<view style="width: 100%;height: 10px;background-color: #eceff3;"></view>
		<view class="bottomTitle">
			<text style="color: #000000;font-size: 14px;margin-left: 5px;">好评率：</text>
			<text style="color: #000000;font-size: 17px;color: #e8654b;">{{dataArr.praiseRatio}}</text>
			<text style="color: #666666;font-size: 14px;margin-left: 5px;">({{dataArr.length}}人评价)</text>
		</view>
		<view class="tableView" v-for="(item,index) in dataArr" :key="index">
			<image :src="baseUrl + item.imgUrl" mode=""></image>
			<view class="content_v">
				<view class="content_v_stratView" >
						<image class="content_v_stratView_image" v-if="index2< item.score" v-for="(item2,index2) in startArr" :key="index2"  src="../../../static/image/home/vdodetail/star_o.png"
						 mode="" ></image>
				</view>
				<view class="" style="font-size: 14;color: #666666;">
					{{item.comment}}
				</view>
			</view>
		</view>
		
	</view> 
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				couserID: '',
				collegeId:'',
				startArr: [1, 2, 3, 4, 5],
				selectStartIndex: 0,
				textValue:'',
				dataArr:[],
				baseUrl:"http://39.105.48.243:8080/crlink/"
			}
		},
		onLoad(e) {
			_this = this;
			this.baseUrl =  getApp().globalData.baseUrl
			this.couserID = e.courseID
			this.collegeId = e.collegeId
		
				this.getCommitData();
			
		},
		methods: {
				
			startClick(index){
				this.selectStartIndex = index
			},
			getCommitData(){
				
				
				// live!ajaxGetCourseComment.action
				let url =  'live!ajaxGetCourseComment.action'
				if(this.collegeId){
					url = 'college!ajaxGetCollegeComment.action'
					}
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post(url, {
					id: _this.couserID?_this.couserID:_this.collegeId,
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
			//添加评价
			
			addComment(){
				var loginkey = uni.getStorageSync('loginKey');
				var selectStartn = _this.selectStartIndex+1;
				
				
				let url = 'live!ajaxAddCourseComment.action'
				if(this.collegeId){
					url = 'college!ajaxAddCollegeComment.action'
				}
				this.$api.post(url, {
					
					id: _this.couserID?_this.couserID:_this.collegeId,
					loginKey: loginkey,
					detail:	_this.textValue,
					score:selectStartn
				}).then(res => {
					if (res.res.status == 0) {
						_this.selectStartIndex=0
						_this.textValue = ''
						_this.getCommitData()
					}else{
						uni.showToast({
							title:res.res.errMsg
						})
					}
				})
				
			},
				
			commit(){
				_this.addComment()
			}
			
		}

	}
</script>

<style lang="scss">
	.topTitle {
		padding-top:15px;
		text-align: center;
		width: 100%;
		font-size: 14px;
		color: #e8654b;
	}

	.line {
		top: 0px;
		width: 100%;
		height: 1px;
		background-color: #cccccc;
		position: fixed;
	}

	.startView {
		margin-top: 5px;
		width: 100%;
		height: 25px;
		// background-color: #000000;
		display: flex;
		justify-content: center;
		align-items: center;

		.start_plate {
			width: 20px;
			height: 20px;
			margin-left: 5px;
			// background-color: #FFA200;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	
	.textView{
		border: 1px solid  #666666;
		border-radius: 4px;
		margin-top: 10px;
		margin-left: 15px;
		margin-right: 15px;
		height: 150px;
		position: relative;
			
		.text_a{
			padding: 5px;
			width: 95%;
			// width: 100%;
			height: 100px;
			color: #666666;
			font-size: 14px;
		}
		
			
		.bottomtextview{
			position: absolute;
			bottom: 5px;
			right: 10px;
			color: #666666;
				
			text{
				color: #e8654b;
			}
		}
		
	}
	
	.commitView{
		display: flex;justify-content: flex-end;width: 100%;
		padding-bottom: 20px;
		.commitBtn{
			border: 1px solid #e8654b;
			border-radius: 15px;
			width: 70px;
			height: 20px;
			font-size: 12px;
			margin-right: 15px;
			margin-top: 10px;
			color: #FFFFFF;
			background-color: #e8654b;
			align-items: center;
			justify-content: center;
			display: flex;
			
			
		}
	}
	
	.bottomTitle{

		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 10px;
	}
	
	
	.tableView{
		display: flex;
		padding: 10px;
		image{
			width: 30px;
			height: 30px;
			border-radius: 15px;
		}
		
		.content_v{
			flex: 1;
			margin-left: 10px;
				
		
		}
		.content_v_stratView{
			 display: flex;
			width: 100%;
			align-items: center;
			padding: 2px 0px;
		}
		.content_v_stratView_image{
			height: 10px;
			width: 10px;
		}
	}
	
</style>

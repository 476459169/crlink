<template>
	<view>
		
		
		<view class="topPlateView">
			<view class="flex_view">
				<view class="topView_item" v-bind:class="[selectIndex==1?'select_color':'']" @click="selectItem(1)">
					学院
				</view>
				<view  style="height: 30px; width: 1px;background-color: #E6E6E6;">
					
				</view>
				<view class="topView_item" v-bind:class="[selectIndex==2?'select_color':'']" @click="selectItem(2)">
					单课
				</view>
			</view>
			<view class="line" ></view>
		</view>
		

		<view class="listView">
			<view v-if="selectIndex==1" class="course" v-for="(item,index) in collegeArr" :key="index" @click="itemClick(item)">
				<image :src="baseurl+item.imgUrl" class="itemImage"></image>
				<view class="itemContent">
					<view style="font-size: 17px;">
						{{item.name}}
					</view>
					<view style="color: #666666; font-size: 16px;">
						{{item.flag=="course"?'讲师：'+item.teacherName:'包含：'+item.courseCount}}
					</view>
					<view style="display: flex;">
						<view class="text_money">
							¥{{item.buyPrice}}
						</view>
						<view class="text_xh">
							{{item.originalPrice?'¥'+item.originalPrice:''}}
						</view>
					</view>

				</view>
			</view>
			
			<view v-if="collegeArr.length==0&&selectIndex==1" class="none_showView">
				<image class="show_image" src="../../../static/image/myCertif/nodata@2x.png" mode=""></image>
			</view>
			
			<view v-if="selectIndex==2" class="course" v-for="(item,index) in couserArr" :key="index" @click="itemClick(item)">
				<image :src="baseurl+item.imgUrl" class="itemImage"></image>
				<view class="itemContent">
					<view style="font-size: 17px;">
						{{item.title}}
					</view>
					<view style="color: #666666; font-size: 16px;">
						{{item.flag=="course"?'讲师：'+item.teacherName:'包含：'+item.courseCount}}
					</view>
					<view style="display: flex;">
						<view class="text_money">
							¥{{item.buyPrice}}
						</view>
						<view class="text_xh">
							{{item.originalPrice?'¥'+item.originalPrice:''}}
						</view>
					</view>
			
				</view>
			</view>
			
			<view v-if="couserArr.length==0&&selectIndex==2" class="none_showView">
				<image class="show_image" src="../../../static/image/myCertif/nodata@2x.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	var self;
	export default {
		data() {
			return {
				baseurl: "http://39.105.48.243:8080/crlink/",
				selectIndex: 1,
				collegeArr: [],
				couserArr: []
			};
		},

		onLoad() {
			self = this;
			self.getData()
		},

		methods: {
			
			
			getData(){
				let loginkey = uni.getStorageSync('loginKey')
				this.$api.post('myCourse!ajaxGetBuyCourse.action',{
					loginKey:loginkey
				}).then(res=>{
					if(res.res.status ==0){
						self.collegeArr =  res.inf.collegeArr
						self.couserArr = res.inf.courseArr

					}
				})
			},

			selectItem(e) {
				if (self.selectIndex !== e) {
					self.selectIndex = e;

				}
			},
				
			itemClick(item){
					
				if(item.flag == "course"){
					uni.navigateTo({ 
						url:'../../home/videoDetail?courseID='+item.id
					})
				}else{
					uni.navigateTo({ 
						url:'../../home/college?collegeId='+item.id
					
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.topPlateView {
		position: fixed;
		top: 0px;
		width: 100%;
		background-color: #FFFFFF;
		.flex_view{
			display: flex;
			align-items: center;
		}

		.topView_item {
			width: 100%;
			text-align: center;
			line-height: 45px;
			color: #666666;
		}

		.select_color {
			color: #e8654b;
		}
	}
	
	

	.line {
		background-color: #e6e6e6;
		width: 100%;
		height: 1px;
	}

	.listView {
		margin-top: 57px;
		width: 100%;
	} 

	.course {
		margin: 10px;
		display: flex;
		background-color: #FFFFFF;
	}

	.itemContent {
		padding: 10upx 10upx;
		width: calc(100vw - 350upx);
		background-color: #FFFFFF;
		display: block;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden
	}

	.itemImage {
		padding: 7.5upx 15upx;
		width: 350upx;
		height: 180upx;
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
	
	.none_showView {
	
		width: 100%;
		height: calc(90vh);
		display: flex;
		align-items: center;
		justify-content: center;
	
		.show_image {
			width: 150px;
			height: 150px;
		}
	}
</style>

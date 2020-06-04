<template>
	<view>
		<view class="topView">
			
			<view class="line" style="position: fixed;top: 0px; z-index: 99;"></view>
			<view class="section" v-for="(item,index) in mydata" :key = "index">
				<view class="section_title">
					{{item.byWatchDate}}
				</view>
				
				<view class="row" v-for="(childItem,index) in item.watchHistoryDatas" :key = "index">
					<image class="row_image" :src="baseUrl+childItem.courseCoverUrl" mode=""></image>
					<view class="content">
						<view class="content_item">
							{{childItem.courseTitle}}
						</view>
						<view class="content_item">
							{{childItem.playTime}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var timer;
	var _this;
	export default {
		data() {
			return {
				mydata:[],
				page:1,
				baseUrl:"http://39.105.48.243:8080/crlink/"
			}
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.getNetData(this.page) 
			
		},
		
		onReachBottom: function() { //当划到最底部的时候触发事件
			 if (timer != null) { //加载缓冲延迟
			 	clearTimeout(timer);
			 }
			 timer = setTimeout(function() {
			 	_this.getNetData(_this.page);
			 }, 600); 
		},
		onLoad() {
			_this = this;
			this.getNetData(this.page)
		},
		methods: {
			getNetData:function(e){
				var	 that = this;
				var loginkey = uni.getStorageSync('loginKey');
				var	userId =  uni.getStorageSync('userId');
				this.$api.post('index!ajaxGetWatchHistory.action',{
					loginKey:loginkey,
					partNum:e,
					userId:userId
					}).then(res => {
					if (res.res.status == 0) {
						if (e == 1) {
						that.mydata = res.inf.arr
						that.page++;
						}else{
							if (e <= res.inf.pageCount) {
								that.mydata = that.mydata.concat(res.inf.arr); //进行数据的累加
								that.page++; //页数的++
								that.loading = "加载更多";
								}else{
									uni.showToast({
										title: "没有更多了"
									});
								}
						}
					}else{
					}
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh(); //数据加载完成,刷新结束
					
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.topView{
		padding: 0px;
		background-color: #FFFFFF;
	}
	
	.section{
			
		.section_title{
			// padding: 15px;
			padding-top: 15px;
			margin-left: 15px;
			font-size: 14px;
		}
		
		.row{
			display: flex;
			align-items: center;
			padding: 10px;
			.row_image{
					padding: 0upx 15upx;
					width: 370upx;
					height: 180upx;
			}
		}
		
		.content{
			width: calc(100vw - 370upx);
			padding: 10upx 0upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 180upx;
		}
		
		.content_item{
			color: #666666;
			font-size: 14px;
			padding: 5px 5px;
		}
		
	
	}
	.line{
		width: 100%;
		height: 1px;
		background-color: #e6e6e6;
	}

</style>

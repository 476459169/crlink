<template>
	<view>
		<view class="line" style="position: fixed;top: 0px; z-index: 99;"></view>
		<view class="topView">
			<view class="topView_top">
				<view class="topView_top_item">
					<view class="topView_top_item_titleText" style="font-size: 16px;">
						累计学习
					</view>
					<view class="topView_top_item_timeText" style="color: #666666;">
						<text style="font-family: Arial, Helvetica, sans-serif; font-size: 18px;color: #000000;">{{studyStatusDict.totalStudyTime}}</text>小时
					</view>
				</view>
				<view class="topView_top_line"></view>
				<view class="topView_top_item flex_class">
					<view class="topView_right_item">
						<view class="topView_right_item_title">
							今日学习
						</view>
						<view class="topView_right_item_content">
							<text style="font-family: Arial, Helvetica, sans-serif; font-size: 15px;color: #000000;">{{studyStatusDict.todayStudyTime}}</text>分钟
						</view>
					</view>
					<view class="topView_right_item">
						<view class="topView_right_item_title">
							连续学习
						</view>
						<view class="topView_right_item_content">
							<text style="font-family: Arial, Helvetica, sans-serif; font-size: 15px;color: #000000;">{{studyStatusDict.continueStudyDays}}</text>天
						</view>
					</view>
				</view>
			</view>
			<view class="topView_bottom">
				<view class="topView_bottom_item" @click="timeSelet(1)">
					<view class="">{{studyYear}}年</view>
					<image v-if="typeSelectInedx==1" class="image_type" src="../../../static/image/cousers/upcrrow.png" mode=""></image>
					<image v-else class="image_type" src="../../../static/image/cousers/downcrrow.png" mode=""></image>


				</view>
				<view class="topView_bottom_item" @click="timeSelet(2)">
					<view class="">{{studyMonth}}月</view>
					<image v-if="typeSelectInedx==2" class="image_type" src="../../../static/image/cousers/upcrrow.png" mode=""></image>
					<image v-else class="image_type" src="../../../static/image/cousers/downcrrow.png" mode=""></image>

				</view>
				<view class="topView_bottom_item" @click="timeSelet(3)">
					<view class="">{{studyStatus}}</view>
					<image v-if="typeSelectInedx==3" class="image_type" src="../../../static/image/cousers/upcrrow.png" mode=""></image>
					<image v-else class="image_type" src="../../../static/image/cousers/downcrrow.png" mode=""></image>

				</view>

			</view>
			<view class="line"></view>
			<view class="upDownList" v-if="upDownListShow" v-for="(item,index) in selectArr" :key="index" @click="upDownItemClick(item)">
				<text v-bind:class="[ item==studyYear?'upDownText':'',item==studyMonth ?'upDownText':'',item==studyStatus ?'upDownText':'']">
					{{item}}</text>
				<view class="line"></view>
			</view>



		</view>

		<view class="table">

			<view class="item_cell " v-for="(item,index) in recordList" :key="index">
				<image src="../../../static/image/mine/studyImg.png" mode=""></image>
				<text class="cell_time"> {{item.createTime.slice(5,16)}}</text>
				<text class="cell_title">{{item.courseTitle}}</text>
				<text class="cell_name">{{item.teacherName}}</text>
				<text class="cell_status">{{item.isCompleted=='NO'?'学习中':'已学完'}}</text>
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
				studyStatusDict: Object,
				studyYearList: Object,
				recordList: [],
				studyMonth: '',
				studyStatus: '全部状态',
				studyYear: '',
				typeSelectInedx: 0,
				selectArr: [],
				upDownListShow: false,
				page: 1,

			}
		},

		onLoad() {
			_this = this;
			this.getstudyData()
		},

		onPullDownRefresh: function() {
			this.page = 1;
			this.getRecordList(this.page)

		},

		onReachBottom: function() { //当划到最底部的时候触发事件
			if (timer != null) { //加载缓冲延迟
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				_this.getRecordList(_this.page);
			}, 600);
		},
		methods: {


			getstudyData() {
				var loginkey = uni.getStorageSync('loginKey')
				var userId = uni.getStorageSync('userId')
				//index!ajaxGetUserStudyStatus.action
				this.$api.post('index!ajaxGetUserStudyStatus.action', {
					loginKey: loginkey,
					userId: userId
				}).then(res => {
					if (res.res.status == 0) {
						_this.studyStatusDict = res.inf
						_this.getStudyearList();
					} else {}
				})
			},
			getStudyearList() {
				var loginkey = uni.getStorageSync('loginKey')
				var userId = uni.getStorageSync('userId')
				this.$api.post('index!ajaxGetUserStudyYearList.action', {
					loginKey: loginkey,
					userId: userId
				}).then(res => {
					if (res.res.status == 0) {
						_this.studyYearList = res.inf.arr
						_this.studyMonth = res.inf.currentMonth
						_this.studyYear = res.inf.currentYear
						_this.getRecordList(1)
					} else {}
				})
			},

			getRecordList(e) {
				var loginkey = uni.getStorageSync('loginKey')
				var userId = uni.getStorageSync('userId')
				this.$api.post('index!ajaxGetCourseRecordHistoryList.action', {
					loginKey: loginkey,
					userId: userId,
					studyMonth: _this.studyMonth < 10 ? '0' + _this.studyMonth.toString() : _this.studyMonth,
					studyStatus: _this.studyStatus == "全部状态" ? '' : _this.studyStatus == "已学完" ? "YES" : "NO",
					studyYear: _this.studyYear,
					firstIndex: e,

				}).then(res => {
					if (res.res.status == 0) {
						if (e == 1) {
							_this.recordList = res.inf.arr
							_this.page++;
						} else {
							if (e <= res.inf.pageCount) {
								_this.recordList = _this.recordList.concat(res.inf.arr); //进行数据的累加
								_this.page++; //页数的++
								_this.loading = "加载更多";
							} else {
								uni.showToast({
									title: "没有更多了"
								});
							}
						}
						
					} else {}
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh(); //数据加载完成,刷新结束
					
				})
			},

			timeSelet(e) {


				if (_this.typeSelectInedx != e) {
					_this.typeSelectInedx = e
					_this.upDownListShow = true

					if (e == 1) {
						_this.selectArr = _this.studyYearList;
					} else if (e == 2) {
						_this.selectArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
					} else if (e == 3) {
						_this.selectArr = ['全部状态', '学习中', '已学完']
					}
				} else {
					_this.typeSelectInedx = 0
					_this.upDownListShow = false
				}


			},


			upDownItemClick(item) {
				if (_this.typeSelectInedx == 1) {
					_this.studyYear = item
				} else if (_this.typeSelectInedx == 2) {
					_this.studyMonth = item
				} else {
					_this.studyStatus = item
				}
				_this.upDownListShow = false, 
					_this.typeSelectInedx = 0,
					_this.selectArr = []
					_this.page=1
				_this.getRecordList(1)
			}

		}
	}
</script>

<style lang="scss">
	.topView {
		background-color: #F8F8F8;
		position: fixed;
		top: 0px;
		width: 100%;

		.topView_top {


			margin: 15upx;
			background-color: #FFFFFF;
			border-radius: 5px;
			box-shadow: 0px 0px 2px #e6e6e6;
			height: 200upx;
			display: flex;

			.topView_top_item {
				width: 50%;
			}

			.topView_top_line {
				width: 1px;
				height: 200upx;
				background-color: #e6e6e6;
				z-index: 8;
			}

			.topView_top_item_titleText {
				line-height: 50upx;
				text-align: center;
				margin-top: 40upx;
			}

			.topView_top_item_timeText {
				line-height: 50upx;
				text-align: center;
				margin-top: 20upx;
			}

			.topView_right_item {
				width: 50%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;

				.topView_right_item_title {
					font-size: 14px;
					line-height: 25px;
					margin-top: 5px;
				}

				.topView_right_item_content {
					font-size: 14px;
					color: #666666;
					line-height: 25px;

				}
			}
		}

		.topView_bottom {
			height: 45px;
			width: 100%;
			display: flex;
			align-items: center;
			background-color: #FFFFFF;

			.topView_bottom_item {
				width: 100%;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #4c4c4c;
			}

			.image_type {
				width: 10px;
				height: 5px;
				margin-left: 5px;
			}
		}


	}

	.flex_class {
		display: flex;
		align-items: center;
	}

	.line {
		width: 100%;
		height: 1px;
		background-color: #e6e6e6;
	}


	.item_cell {
		display: flex;
		width: 100%;
		align-items: center;
		color: #666666;
		font-size: 13px;
		text-align: center;
		background-color: #FFFFFF;

		image {
			padding: 10px 5px 10px 10px;
			width: 10px;
			height: 10px;
		}

		.cell_time {
			width: 80px;
		}

		.cell_title {
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.cell_name {
			width: 50px;
		}

		.cell_status {
			width: 55px;
		}

	}



	.upDownList {
		background-color: #FFFFFF;
		color: #666666;
		height: 35px;
		align-items: center;
		padding: 0px 10px;

		text {
			line-height: 34px;
			margin-left: 20px;
			width: 100%;
		}

		.upDownText {
			color: #e8654b;
		}
	}


	.table {
		margin-top: 320upx;
	}
</style>

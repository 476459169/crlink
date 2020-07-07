<template>
	<view>

		<view class="" v-if="scorePage">
			<view class="table_list" style="margin-top: 1px;">
				<view class="cell" v-for="(item,index) in examScoreArr" :key="index">
					<view class="cell_title">{{item.examName}}</view>
					<view class="cell_item">
						<image class="cell_img" src="../../../static/image/mine/studyImg.png" mode=""></image>
						<text class="cell_text">考试时间：{{item.examTime}}</text>
					</view>
					<view class="cell_item">
						<image class="cell_img" src="../../../static/image/mine/studyImg.png" mode=""></image>
						<text class="cell_text">得分：{{item.examScore}}</text>
					</view>

					<view class="line" style="margin-top: 10px;"></view>
				</view>
			</view>
		</view>


		<view class="" v-else>
			<view class="top_selectView">
				<view class="line"></view>
				<view class="top_flex" @click="topViewClcik(1)">
					<view class="select_text">
						{{selectTypeText}}
					</view>
					<image v-if="typeSelectInedx==1" class="image_type" src="../../../static/image/cousers/upcrrow.png" mode=""></image>
					<image v-else class="image_type" src="../../../static/image/cousers/downcrrow.png" mode=""></image>
				</view>
				<view class="line"></view>

				<view class="" v-if="listShow">
					<view class="upDownList" v-for="(item,index) in selectTypeArr" :key="index" @click="upDownItemClick(item,index)">
						<text v-bind:class="[ item==selectTypeText?'upDownText':'']">
							{{item}}</text>
						<view class="line"></view>
					</view>
				</view>

			</view>

			<view class="table_list">
				<view class="cell" v-for="(item,index) in dataArr" :key="index" @click="itemClick(item)">
					<view class="cell_title">{{item.examName}}</view>
					<view class="cell_item">
						<image class="cell_img" src="../../../static/image/mine/studyImg.png" mode=""></image>
						<text class="cell_text">考试开始时间：{{item.startTime}}</text>
					</view>
					<view class="cell_item">
						<image class="cell_img" src="../../../static/image/mine/studyImg.png" mode=""></image>
						<text class="cell_text">考试结束时间：{{item.endTime}}</text>
					</view>
					<view class="cell_item">
						<image class="cell_img" src="../../../static/image/mine/studyImg.png" mode=""></image>
						<text class="cell_text">总分：{{item.examTotalScore}}</text>

						<view v-if="item.examStatus == '未报名'"></view>
						<view v-else-if="item.examStatus == '已报名'" class="cell_ybm">
							已报名
						</view>
						<view v-else-if="item.examStatus == '已结束'" class="cell_js">
							已结束
						</view>

					</view>

					<view class="line" style="margin-top: 10px;"></view>
				</view>
			</view>
		</view>

		<view style="height: 55px; width: 100%;">
			<view class="bottom_tabbar">
				<view class="line"></view>
				<view class="flex_view">
					<view class="tabbar_item" @click="tabbarItemSelect(0)">
						<image class="tabbar_image" :src="[select_tabbarIndex==0?'../../../static/image/test/exam-sel.png':'../../../static/image/test/exam.png']"
						 mode=""></image>
						<view class="tabbar_text" v-bind:class="[select_tabbarIndex==0?'select_color':'']">
							考试
						</view>
					</view>
					<view class="tabbar_item" @click="tabbarItemSelect(1)">

						<image class="tabbar_image" :src="[select_tabbarIndex==1?'../../../static/image/test/record-sel.png':'../../../static/image/test/record.png']"
						 mode=""></image>
						<view class="tabbar_text" v-bind:class="[select_tabbarIndex==1?'select_color':'']">
							成绩
						</view>
					</view>
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
				select_tabbarIndex: 0,
				typeSelectInedx: 0,
				selectTypeText: '所有状态',
				selectTypeIndex: 0,
				selectTypeArr: ['所有状态', "已结束"],
				listShow: false,
				dataArr: [],
				examScoreArr: [],
				scorePage: false,



			};
		},

		onLoad() {
			_this = this
		},

		onShow() {
			this.getListData(_this.selectTypeIndex)
			this.getUserExamScore()
		},
		
		onPullDownRefresh() {
			this.getListData(_this.selectTypeIndex)
			this.getUserExamScore()
		},
		
		onReachBottom() {
			this.getListData(_this.selectTypeIndex)
			this.getUserExamScore()
		},
		

		methods: {

			getListData(index) {
				let loginKey = uni.getStorageSync('loginKey')
				this.$api.post('exam!ajaxGetExamByConditions.action', {
					loginKey: loginKey,
					selExamStatus: index
				}).then(res => {
					console.log("res = " + res);
					if (res.res.status == 0) {
						_this.dataArr = res.inf.arr
					}
				})
				uni.hideNavigationBarLoading();
				uni.stopPullDownRefresh(); //数据加载完成,刷新结束
			},


			getUserExamScore() {
				let loginKey = uni.getStorageSync('loginKey')
				this.$api.post('exam!ajaxGetUserExamScore.action', {
					loginKey: loginKey
				}).then(res => {
					console.log("res = " + res);
					if (res.res.status == 0) {
						_this.examScoreArr = res.inf.arr
					}
				})
				uni.hideNavigationBarLoading();
				uni.stopPullDownRefresh(); //数据加载完成,刷新结束
			},


			itemClick(item) {
				if (item.examStatus === "未报名") {
					//预约
					uni.showModal({
						title: "预约考试",
						content: "是否确认预约考试\n" + item.examName,
						success: function(res) {
							if (res.confirm) {
								let loginKey = uni.getStorageSync('loginKey')
								_this.$api.post('exam!ajaxSignUpExam.action', {
									loginKey: loginKey,
									examId: item.id
								}).then(res => {
									console.log("res = " + res);
									if (res.inf.status === "报名成功") {
										// console.log("baoming" + jsObject);
										uni.showToast({
											title: "报名成功"
										})
										_this.getListData(_this.selectTypeIndex)
										
									} else {
										uni.showToast({
											title: res.inf.status,
										
										});
									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				} else if (item.examStatus === "已报名") {
					//已报名
					uni.navigateTo({
						url: './beginTest?examId=' + item.id
					})
				} else if (item.examStatus === "已结束") {
					//已结束
				} else {
					uni.navigateTo({
						url: './beginTest?examId=' + item.id
					})
				}


			},

			testRegistration(examid) {
				
			},






			tabbarItemSelect(e) {
				_this.select_tabbarIndex = e
				if(e==1){
					_this.scorePage = true
					
				}else{
					_this.scorePage = false
				}
			},


			topViewClcik(e) {
				if (e !== _this.typeSelectInedx) {
					_this.typeSelectInedx = e
					_this.listShow = true
				} else {
					_this.typeSelectInedx = 0;
					_this.listShow = false

				}

			},
			upDownItemClick(item, index) {
				_this.selectTypeText = item;
				_this.typeSelectInedx = 0;
				_this.listShow = false
				_this.selectTypeIndex = index
				if (item == '已结束') {
					_this.selectTypeIndex = 2
				}

				_this.getListData(_this.selectTypeIndex)
			}
		}

	}
</script>

<style lang="scss">
	.top_selectView {
		position: fixed;
		top: 0;
		width: 100%;
		background-color: #FFFFFF;


		.top_flex {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 10px;
		}

		.select_text {
			color: #666666;
			font-size: 14px;
		}

		.image_type {
			width: 10px;
			height: 5px;
			margin-left: 5px;
		}


		.upDownList {
			background-color: #FFFFFF;
			color: #666666;
			height: 40px;
			align-items: center;
			justify-content: center;
			padding: 0px 10px;

			text {
				line-height: 39px;
				margin-left: 20px;
				width: 100%;
			}

			.upDownText {
				color: #e8654b;
			}
		}
	}

	.bottom_tabbar {
		position: fixed;
		bottom: 0;
		width: 100%;
		// height: 45px;
		height: 55px;
		background-color: #FFFFFF;




		.tabbar_item {
			width: 50%;
			height: 55px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.tabbar_image {
				width: 25px;
				height: 25px;
				margin-top: 5px;
			}

			.tabbar_text {
				line-height: 20px;
				padding: 2px;
				color: #666666;
				font-size: 12px;
			}

			.select_color {
				color: #e8654b;
			}
		}




	}

	.line {
		width: 100%;
		height: 1px;
		background-color: #e6e6e6;
	}

	.flex_view {
		display: flex;
	}

	.table_list {
		margin-top: 45px;
		width: 100%;
		background-color: #FFFFFF;

		.cell {
			padding: 0px 15px;
			color: #666666;

			.cell_title {

				padding: 10px 0px 5px 0px;
				font-size: 14px;
				color: #000000;
			}

			.cell_item {
				display: flex;
				align-items: center;
				justify-content: center;

				.cell_img {
					width: 15px;
					height: 15px;
				}

				.cell_text {
					margin-left: 10px;
					font-size: 14px;
					flex: 1;
				}

				.cell_js {
					border: 1px solid #666666;
					border-radius: 5px;
					width: 80px;
					height: 20px;
					font-size: 13px;
					color: #666666;
					text-align: center;
					line-height: 20px;
				}

				.cell_ybm {
					border: 1px solid #e8654b;
					border-radius: 5px;
					width: 80px;
					height: 20px;
					font-size: 13px;
					color: #e8654b;
					text-align: center;
					line-height: 20px;
				}

			}


		}
	}
</style>

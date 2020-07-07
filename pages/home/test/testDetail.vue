<template>
	<view>

		<view class="line"></view>
		<view class="top_view">
			<view class="top_title">考试试卷：{{dataArr.title}}</view>
			<view class="top_time">
				<image class="top_timeImg" src="../../../static/image/mine/studyImg.png" mode=""></image>
				<view class="top_timeText">
					{{min}}/{{dataArr.examDuration}}分钟
				</view>
			</view>
			<view class="top_commitBtn" @click="commit()">交卷</view>
		</view>

		<view class="contentView">
			<view class="contentView_title">
				{{topicItem.qsnType}}
			</view>
			<view class="contentView_tm">
				{{topicItem.index}}.{{topicItem.subjects}}
			</view>
			<view class="contentView_items" v-for="(item,index) in itemArr " :key="index" @click="itemClick(item,index)">
				<view class="content_flex" v-if="topicItem.qsnType !=='多选题'">
					<view :class="[topicItem.selected==item.id?'content_items_select':'content_items_normal']">
						{{item.id}}
					</view>
					<view class="content_items_text">
						{{item.answer}}
					</view>
				</view>

				<view class="content_flex" v-else>
					<view :class="[topicItem.selected.indexOf(item.id)!==-1?'content_items_select':'content_items_normal']" @click="itemClick(item,index)">
						{{item.id}}
					</view>
					<view class="content_items_text">
						{{item.answer}}
					</view>
				</view>
			</view>
		</view>


		<view class="tagViews">
			<view class="tag_view_r" @click="tagClick()">标记</view>
			<view class="tag_view_b" @click="beforeClcik()">上一题</view>
			<view class="tag_view_b" @click="afterClcik()">下一题</view>
		</view>

		<view class="bottomView" v-if="showTopicCar==false">
			<view class="bottom_fixed">
				<view class="flex_view" @click="bottomCarClick()">
					<view class="bottom_item_flex">
						<view class="bottom_tag">标记</view>
						<view class="bottom_text">{{tagNumber}}</view>
					</view>
					<view class="bottom_item_flex">
						<view class="bottom_yd">已答</view>
						<view class="bottom_text">{{topicYD}}</view>
					</view>
					<view class="bottom_item_flex">
						<view class="bottom_wd">未答</view>
						<view class="bottom_text">{{quesArr.length - topicYD}}</view>
					</view>
					<view class="bottom_item_flex">
						<image class="bottom_mlImg" src="../../../static/image/test/menu.png" mode=""></image>
						<view class="bottom_text">{{topicYD}}/{{quesArr.length}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottomView" v-if="showTopicCar==true">
			<view class="bottom_fixed">
				<view class="flex_view" @click="bottomCarClick()">
					<view class="bottom_item_flex">
						<view class="bottom_tag">标记</view>
						<view class="bottom_text">{{tagNumber}}</view>
					</view>
					<view class="bottom_item_flex">
						<view class="bottom_yd">已答</view>
						<view class="bottom_text">{{topicYD}}</view>
					</view>
					<view class="bottom_item_flex">
						<view class="bottom_wd">未答</view>
						<view class="bottom_text">{{quesArr.length - topicYD}}</view>
					</view>
					<view class="bottom_item_flex">
						<image class="bottom_mlImg" src="../../../static/image/test/menu.png" mode=""></image>
						<view class="bottom_text">{{topicYD}}/{{quesArr.length}}</view>
					</view>
				</view>
				<view class="line"></view>

				<view class="bottom_car" v-if="showTopicCar">
					<view class="car_flex">
						<view class="car_item car_item_normal" :class="[item.tag==true?'car_item_tg':item.selected.length>0?'car_item_yd':'']"
						 v-for="(item,index) in quesArr" :key="index" @click="carItemClick(item,index)">
							{{item.index}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	var _this;
	var timer = null;
	export default {
		data() {
			return {
				examId: '',
				dataArr: undefined,
				quesArr: undefined,
				topicIndex: 0, //当前的第几题  下标 0==1 第一题
				tagNumber: 0, //标记数量
				topicYD: 0, //已答数量
				showTopicCar: false, //是否展示答题卡
				min: 0,
				seconds: 0,
				unfinished:true
			}
		},
		onLoad(e) {
			_this = this
			console.log('examid = ' + e.examId);
			this.examId = e.examId
			this.getData()
		},

		onUnload() {
			console.log("onUnload");
			if (_this.timer) {
				clearInterval(_this.timer)
				_this.timer = null
				_this.subCommit()
			}
		},

		onHide() {
			console.log("22onhide");
			if (_this.timer) {
				clearInterval(_this.timer)
				_this.timer = null
			}
		},
		onShow() {

			if (_this.timer == null && _this.dataArr) {

				//
				console.log("_this.dataArr11111 = " + _this.dataArr);

				var s = _this.dataArr.examStartTime.replace(/-/g, "/");
				var startTime = new Date(s);
				var endTime = new Date()

				_this.seconds = (endTime - startTime) / 1000

				console.log("startTime = " + startTime + "endTime=" + endTime + "_this.seconds=" + _this.seconds);
				_this.timerRun()
			}
		},
		methods: {
			getData() {
				let loginKey = uni.getStorageSync('loginKey')
				this.$api.post('exam!ajaxGetExamPaper.action', {
					loginKey: loginKey,
					examId: _this.examId
				}).then(res => {

					if (res.res.status == 0) {

						_this.dataArr = res.inf
						_this.quesArr = res.inf.questionsArr

						console.log("_this.quesArr = " + _this.quesArr);

						_this.timerRun();
					}
				})
			},

			itemClick(item, index) {

				if (this.topicItem.qsnType == '多选题') {



					if (this.topicItem.selected.indexOf(item.id) == -1) {
						if (this.topicItem.selected.length == 0) {
							this.topicYD++
						}
						this.topicItem.selected.push(item.id)
					} else {
						var index1 = this.topicItem.selected.indexOf(item.id);
						this.topicItem.selected.splice(index1, 1)

						if (this.topicItem.selected.length == 0) {
							this.topicYD--
						}
					}


				} else {
					if (this.topicItem.selected.length == 0) {
						this.topicYD++
					}
					this.topicItem.selected = item.id
				}
			},


			bottomCarClick() {
				this.showTopicCar = !this.showTopicCar
				console.log("this.showTopicCar = " + this.showTopicCar);
			},


			carItemClick(item, index) {

				this.topicIndex = index;
				this.showTopicCar = false
			},


			tagClick() {


				this.topicItem.tag = this.topicItem.tag == false ? true : false
				if (this.topicItem.tag == false) {
					this.tagNumber--
				} else {
					this.tagNumber++
				}

				console.log("this.topicitem.tag = " + this.topicItem.tag);
			},

			beforeClcik() {
				if (this.topicItem.index == 1) {
					uni.showToast({
						title: "已经第一题！"
					})
				} else {
					this.topicIndex = this.topicIndex - 1;
				}
			},


			afterClcik() {
				if (this.topicItem.index == this.quesArr.length) {
					uni.showToast({
						title: "已经最后一题！"
					})
				} else {
					this.topicIndex = this.topicIndex + 1;
				}
			},

			timerRun() {
				this.timer = setInterval(() => {
					_this.seconds++;
					console.log('this.seconds = ' + _this.seconds);

					_this.min = parseInt(_this.seconds / 60);
					if (_this.seconds / 60 >= _this.dataArr.examDuration) {
						clearInterval(_this.timer)
						_this.timer = null
						_this.subCommit()
					}
				}, 1000)
			},


			commit() {
				uni.showModal({
					title: "交卷",
					content: "确认交卷",
					success: function(res) {
						if (res.confirm) {
							_this.subCommit()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			subCommit() {
				let loginKey = uni.getStorageSync('loginKey')

				// let data = JSON.stringify(_this.dataArr)
				//转换abcd 为1234
				var obj = {};
				obj = JSON.parse(JSON.stringify(_this.dataArr));
				var len = obj.questionsArr.length
				for (var i = 0; i < len; i++) {
					var item = obj.questionsArr[i];
					if (item.qsnType == "多选题") {
						var tArr = [];
						for (var y = 0; y < item.selected.length; y++) {
							var childIteem = item.selected[y];
							if (childIteem == "A") {
								childIteem = "1";
							} else if (childIteem == "B") {
								childIteem = "2";
							} else if (childIteem == "C") {
								childIteem = "3";
							} else if (childIteem == "D") {
								childIteem = "4";
							}
							tArr.push(childIteem);
						}
						item.selected = tArr;
					} else {
						if (item.selected == "A") {
							item.selected = "1";
						} else if (item.selected == "B") {
							item.selected = "2";
						} else if (item.selected == "C") {
							item.selected = "3";
						} else if (item.selected == "D") {
							item.selected = "4";
						}
					}
				}


				let data = JSON.stringify(obj)
				this.$api.post('exam!ajaxCommitUserAnswers.action', {
					loginKey: loginKey,
					commitAnswers: data
				}).then(res => {
					if (res.res.status == 0) {
						clearInterval(_this.timer)
						_this.timer =null
						uni.showToast({
							title: '提交成功',
							success() {
								uni.navigateBack({
									delta: 2
								})
							}
						})
					} else {
						uni.showToast({
							title: '提交失败',
							success() {}
						})
					}
				})
			}

		},
		computed: {

			topicItem() {
				//当前的题目模型
				if (this.quesArr) {
					let item = _this.quesArr[_this.topicIndex]
					return item;
				}

				return undefined

			},


			itemArr() {
				if (this.topicItem) {
					return this.topicItem.itemArr
				}
				return []

			}
		}
	}
</script>

<style lang="scss">
	.top_view {
		width: 100%;
		background-color: #FFFFFF;
		position: relative;

		.top_title {
			line-height: 25px;
			color: #666666;
			font-size: 16px;
			padding: 15px;

		}

		.top_time {
			display: flex;
			padding: 15px;
			align-items: center;

			.top_timeImg {
				height: 15px;
				width: 15px;
			}

			.top_timeText {
				margin-left: 10px;
				width: 100px;
			}
		}


		.top_commitBtn {
			position: absolute;
			bottom: 20px;
			right: 20px;
			width: 100px;
			height: 40px;
			background-color: #e8654b;
			color: #FFFFFF;
			font-size: 14px;
			text-align: center;
			line-height: 40px;
		}
	}

	.line {
		width: 100%;
		height: 1px;
		background-color: #e6e6e6;
	}

	.contentView {
		margin-top: 15px;
		width: 100%;
		background-color: #FFFFFF;
		padding: 15px;


		.contentView_title {
			color: #e8654b;
			font-size: 15px;
			line-height: 40px;
		}

		.contentView_tm {
			color: #666666;
			font-size: 14px;
			padding: 5px 0px;

		}

		.contentView_items {
			color: #666666;
			padding: 5px 0px;

			.content_flex {
				display: flex;
				align-items: center;
			}

			.content_items_normal {
				width: 20px;
				height: 20px;
				border: 1px solid #666666;
				border-radius: 10px;
				color: #666666;
				text-align: center;
				line-height: 20px;
				font-size: 14px;
				flex-shrink: 0;
			}

			.content_items_select {
				width: 20px;
				height: 20px;
				border: 1px solid #e8654b;
				border-radius: 10px;
				background-color: #e8654b;
				color: #FFFFFF;
				text-align: center;
				line-height: 20px;
				font-size: 14px;
				flex-shrink: 0;
			}

			.content_items_text {
				font-size: 14px;
				margin-left: 10px;
				padding-right: 20px;
			}

		}
	}

	.tagViews {
		width: 100%;
		margin-top: 20px;
		display: flex;
		justify-content: space-evenly;

		.tag_view_r {
			background-color: #e8654b;
			color: #FFFFFF;
			font-size: 15px;
			text-align: center;
			padding: 5px 20px;
			width: 60px;
		}

		.tag_view_b {
			background-color: #799bce;
			color: #FFFFFF;
			font-size: 15px;
			text-align: center;
			padding: 5px 20px;
			width: 60px;
		}
	}

	.bottomView {
		width: 100%;

		.bottom_fixed {
			width: 100%;
			background-color: #FFFFFF;
			position: fixed;
			bottom: 0px;

			.flex_view {
				display: flex;
				align-items: center;


				.bottom_item_flex {
					display: flex;
					align-items: center;
					width: 100%;
					height: 45px;
					justify-content: center;

					.bottom_tag {
						background-color: #e8654b;
						color: #FFFFFF;
						font-size: 12px;
						text-align: center;
						width: 30px;
						height: 15px;
						line-height: 15px;
						text-align: center;
						padding: 5px 10px;
						flex-shrink: 0;
					}

					.bottom_yd {
						background-color: #799bce;
						color: #FFFFFF;
						font-size: 12px;
						text-align: center;
						width: 30px;
						height: 15px;
						line-height: 15px;
						text-align: center;
						padding: 5px 10px;
						flex-shrink: 0;
					}

					.bottom_wd {
						background-color: #FFFFFF;
						color: #666666;
						font-size: 12px;
						text-align: center;
						width: 30px;
						height: 15px;
						line-height: 15px;
						text-align: center;
						border: 1px solid #666666;
						padding: 5px 10px;
						flex-shrink: 0;
					}

					.bottom_mlImg {
						width: 40px;
						height: 25px;
						flex-shrink: 0;
					}

					.bottom_text {
						font-size: 12px;
						color: #666666;
						margin-left: 5px;
					}
				}
			}

			.bottom_car {
				width: 100%;
				background-color: #FFFFFF;


				.bottom_line {
					width: 100%;
					height: 1px;
					background-color: #e6e6e6;
				}

				.car_flex {
					display: flex;
					flex-wrap: wrap;



					.car_item {
						width: 40px;
						height: 40px;
						margin: 5px;
						font-size: 12px;
						border-radius: 5px;
						text-align: center;
						line-height: 40px;
					}

					.car_item_normal {
						border: 1px solid #e6e6e6;
						color: #666666;
					}

					.car_item_tg {
						border: 1px solid #e8654b;
						background-color: #e8654b;
						color: #FFFFFF;
					}

					.car_item_yd {
						border: 1px solid #799bce;
						background-color: #799bce;
						color: #FFFFFF;
					}




				}
			}
		}




	}
</style>

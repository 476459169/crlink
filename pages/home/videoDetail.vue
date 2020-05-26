<template>



	<view>
		<view class="">
			<view class="topView">
				<view>
					<video id="myVideo" :src="videoUrl" direction="-90" @play="vdoPlay" @error="videoErrorCallback" @pause="vdopause"
					 @timeupdate="vedioTimeUpDate" @progress="vedioProgress" style="z-index: 1;"></video>
				</view>

				<view class="scorl_item">
					<view class="scorl_child_item" v-bind:class="itemSelect1" @click="itemSelect(0)">介绍</view>
					<view class="scorl_child_item" v-bind:class="itemSelect2" @click="itemSelect(1)">提问</view>
					<view class="scorl_child_item" v-bind:class="itemSelect3" @click="itemSelect(2)">测试</view>
				</view>
				<view class="line"></view>
			</view>

			<!-- <scroll-view class="scorll_class" scroll-y="flase"> -->
			<view v-if="selectIndex==0" class="scorll_class">
				<view class="showMessage">
					<view class="showMessage_title">{{myData.title}}</view>
					<view class="showMessage_flexView">
						<view class="showMessage_autor">讲师：{{myData.author}}</view>
						<view class="showMessage_autor">有效期1年</view>
					</view>
					<view class="showMessage_flexView">
						<view class="showMessage_money">￥{{myData.buyPrice}}</view>
						<view class="showMessage_ymoney">￥{{myData.isJoin}}</view>
					</view>
					<view class="showMessage_flexView">
						<image class="showMesage_watch" src="../../static/image/home/vdodetail/watchCount@2x.png" mode=""></image>
						<view class="showMessage_watchNum">{{myData.viewNum}}</view>
						<view class="" style="margin-right: 20rpx;display: flex;align-items: center;">
							<image class="showMessage_bottomImg" src="../../static/image/home/vdodetail/comments@2x.png" mode=""></image>
							<image class="showMessage_bottomImg" src="../../static/image/home/vdodetail/collection_g@2x.png" mode=""></image>
							<image class="showMessage_bottomImg" src="../../static/image/home/vdodetail/shareHui@2x.png" mode=""></image>
						</view>
					</view>

				</view>

				<view class="showMessage_flexView showMessage_selectcourse">
					<view class="showMessage_selectcourseTitle">课程选集</view>
					<view class="showMessage_selectcourseItems">
						<view class="showMessage_courseItems " v-bind:class="[itemSelectIndex==index?'courserItems_style':'']" v-for="(item, index) in myData.parts"
						 :key="item.partTitle" @click="courseItemsSelct(index)">
							{{item.partTitle}}
						</view>
					</view>
				</view>
				<view class="belongCollege" >
					<view class="showMessage_flexView">
						<view class="belongCollegeTitle">所属学院</view>
						<view class="belongCollegeMore">更多 ⟩</view>
					</view>
					<view class="showMessage_flexView">
						<view class="belongcollegeimg" v-for="(item,index) in myData.colleges" :key="index">
							<image class="collegimage" :src="baseUrl+item.collegeImgUrl" mode="aspectFit"></image>
							<view class="collegeImageTextview">
								{{item.collegeName}}
							</view>
						</view>
					</view>
				</view>
				<view class="line"></view>
				<view class="bottomView">
					<rich-text :nodes="myData.detail|formatRichText"></rich-text>
				</view>
			</view>


			<view v-if="selectIndex==1" class="scorll_class">
				<view class="quesView" v-for="(item) in quesArr">
					<view class="quesUser">
						<image class="quesImg" :url="baseUrl+item.imgUrl" mode=""></image>

						<view class="quesTopUser">
							<view class="" style="display: flex;height: 25px;">
								<view class="quesName">{{item.realName}}</view>
								<view class="quesTime">{{item.time}}</view>
							</view>
							<view class="quesMessage">
								{{item.title}}
							</view>
						</view>
					</view>

					<view class="quesReply">
						<view class="quesReplyView" v-for="(itemclild) in item.replyArr">
							<text @click="replyQueser(item,itemclild.userId)">{{itemclild.userName}}</text> <text style="color: #666666;">{{itemclild.replyUserName.length>0?'回复'+itemclild.replyUserName:""}}</text>:{{itemclild.content}}
						</view>
					</view>

					<view class="quesBtns">
						<view class="quesLike">
							<button type="default" @click="likeBtnClick(item)">
								<image v-if="item.isGood ==0" src="../../static/image/home/vdodetail/good@2x.png" mode="scaleToFill"></image>
								<image v-if="item.isGood ==1" src="../../static/image/home/vdodetail/goodSel@2x.png" mode="scaleToFill"></image>
								<view class="" style="flex: 1;font-size: 12px;">
									点赞
								</view>
							</button>
						</view>
						<view class="quesReplybtn">
							<button type="default" @click="replyBtnClick(item)">
								<image src="../../static/image/home/vdodetail/reply@2x.png" mode="scaleToFill"></image>
								<view class="" style="flex: 1;font-size: 12px;">
									回复
								</view>
							</button>
						</view>
					</view>
				</view>
			</view>

			<!-- </scroll-view> -->



			<view class="fixedBottom">

				<view v-if="selectIndex==0 && myData.viewType !==0" class="buy_class">
					<view style="background-color: #fd6666;width: 50%;color: #FFFFFF;">
						<view style="width: 100%;text-align: center;font-size: 14px;line-height: 22.5px;padding: 0px 0px;">
							{{myData.isBuy==1?'已购买':'单独购买'}}
						</view>
						<view style="width: 100%;text-align: center;font-size: 14px;line-height: 22.5px;padding: 0px 0px;">
							{{myData.isBuy==1?'到期时间'+myData.remainDays:'￥'+myData.buyPrice}}
						</view>
					</view>
					<view style="font-size: 16px;color:#fd6666 ;background-color: #f3cbc3;text-align: center;line-height: 45px;width: 50%;">
						查看所属学院
					</view>
				</view>
				<view v-else-if="selectIndex==1" class="questions" @click="confirmDialog">
					提问
				</view>
			</view>

			<!-- 提交信息 -->
			<uni-popup ref="dialogInput" type="dialog" style="z-index:999;">
				<uni-popup-dialog mode="input" title="提问" value="" placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>

			<!-- 回复 -->
			<uni-popup ref="dialogInputreply" type="dialog" style="z-index:999;">
				<uni-popup-dialog mode="input" title="回复" value="" placeholder="请输入内容" @confirm="replyConfirm"></uni-popup-dialog>
			</uni-popup>

		</view>
	</view>

</template>



<script>
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue'
	var _this;
	var timer = null;
	export default {
		components: {

			uniPopupMessage,
			uniPopupDialog,
			uniPopupShare

		},
		data() {
			return {
				src: '',
				couserID: '',
				selectIndex: 0,
				danmuValue: '',
				courseArr: ["1", "2", "3", "4", "5", "6", "7", "8"],
				itemSelectIndex: 0,
				itemSelectClass: 'courserItems_style',
				collegeArr: ["1", "2"],
				myData: Object,
				quesArr: [],
				iscollege: false,
				videoUrl: "",
				autoPlay: false,
				baseUrl: "http://39.105.48.243:8080/crlink/",
				loading: "加载更多",
				page: 1,
				replyItem: Object,
				replyUserid: ''

			}
		},

		onLoad(e) {
			_this = this;
			this.couserID = e.courseID;
			this.getNetMessage();
			this.getQues(this.page);
		},
		onShow() {},
		computed: {


			itemSelect1: function() {
				return {
					selected: this.selectIndex == 0,
					normal: this.selectIndex != 0

				}
			},
			itemSelect2: function() {
				return {
					selected: this.selectIndex == 1,
					normal: this.selectIndex != 1
				}
			},
			itemSelect3: function() {
				return {
					selected: this.selectIndex == 2,
					normal: this.selectIndex != 2
				}
			},

			courseSelct: function() {

				return {}
			},



			glCollegeArr: function() {
				// if (this.myData.type.length > 2) {
				// 	return this.myData.type.slice(0, 2);
				// } else {
				// 	return this.myData.type
				// }
				// console.log("types = " + this.myData.type);
				return ["cra", "crc"]
			},

		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		onPullDownRefresh: function() {
			// console.log('refresh');
			// setTimeout(function() {
			uni.stopPullDownRefresh();
			// }, 10);
		},

		onReachBottom: function() { //当划到最底部的时候触发事件
			if (timer != null) { //加载缓冲延迟
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				_this.getQues(_this.page);
			}, 600);
		},
		filters: {
			formatRichText(html) { //控制小程序中图片大小

				if (html) {
					let newContent = html.toString().replace(/<img[^>]*>/gi, function(match, capture) {
						// match = match.replace(/src="/g, 'src="http://39.105.48.243:8080/crlink');
						match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
						match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
						match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
						return match;
					});

					newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
						match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
						return match;
					});
					// newContent = newContent.replace(/<br[^>]*\/>/gi, '');
					newContent = newContent.replace(/\<img/gi,
						'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
					return newContent;
				}

			}
		},
		methods: {


			vedioTimeUpDate(e) {
				// console.log("currentTime"+e.detail.currentTime+"duration"+e.detail.duration);
			},

			vedioProgress(e) {
				console.log("buffered");
				console.log("buffered" + e.detail.buffered);
			},

			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},

			//获取详情信息
			getNetMessage: function() {


				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('index!ajaxGetCourseDetailNew.action', {
					id: _this.couserID,
					loginKey: loginkey
				}).then(res => {
					if (res.res.status == 0) {
						_this.myData = res.inf;
						_this.videoUrl = res.inf.parts[0].videoUrl;
						// this.videoContext.pause(); 
						if (res.inf.viewType == 2 && res.inf.isBuy == 1) { //判断是否需要购买 是否已经购买
							_this.autoPlay = true;
						} else if (res.inf.viewType == 0) {
							_this.autoPlay = false;
						}

					}
				})
			},
			//获取提问信息
			getQues(e) {

				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('live!ajaxGetCourseQuestion.action', {
					id: _this.couserID,
					loginKey: loginkey,
					firstIndex: e.toString()
				}).then(res => {
					if (res.res.status == 0) {
						if (e == 1) {
							let array = res.inf.arr;
							array.forEach(item => {

								if (!item.replyArr) {
									item.replyArr = []
								}
								 _this.quesArr.push(item)
							})

					console.log("ques="+array);
							_this.page++;
						} else {
							if (e <= res.inf.pageCount) {
								console.log("ques= " + _this.quesArr)
								_this.quesArr = _this.quesArr.concat(res.inf.arr); //进行数据的累加
								_this.page++; //页数的++
								_this.loading = "加载更多";
							}
						}
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh(); //数据加载完成,刷新结束

					}
				})
			},
			//
			//提问
			addQues(str) {
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('live!ajaxAddCourseQuestion.action', {
					detail: str,
					loginKey: loginkey,
					partId: _this.myData.parts[0].partId,

				}).then(res => {
					console.log("addques=" + res.res.status);
					if (res.res.status == 0) {
						console.log("addQues1= " + res);
						uni.showToast({
							title: '提交成功'
						});
						_this.quesArr = [];
						_this.page = 1;
						_this.getQues(_this.page)
					} else {
						uni.showModal({
							title: "提交失败"
						})
					}
				})
			},
			//回复层主
			reply(item, replyuserid, str) {
				console.log("zhiqian = " + _this.replyItem.replyArr + _this.quesArr);
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('live!ajaxAddCourseQuestionReply.action', {
					detail: str,
					loginKey: loginkey,
					partId: _this.myData.parts[0].partId,
					id: item.id,
					replyId: replyuserid ? replyuserid : item.id,
					replyUserId: replyuserid ? replyuserid : '',
				}).then(res => {

					if (res.res.status == 0) {
						uni.showToast({
							title: '提交成功'
						});
						_this.replyUserid = '';
						_this.replyItem.replyArr = res.inf.replyArr;
						console.log("zhihou=" + _this.replyItem.replyArr + _this.quesArr);

					} else {
						uni.showModal({
							title: '提交失败'
						})
					}
				})
			},

			itemSelect: function(e) {
				this.selectIndex = e
			},


			courseItemsSelct: function(e) {
				//更换课程 这里调试数据
				this.itemSelectIndex = e;
				this.videoUrl = this.myData.parts[e].videoUrl;
			},

			//vdo

			vdoPlay: function() {

				// console.log("vdoplay" + this.myData.viewType + "isbuy" + this.myData.isBuy);
				if (this.myData.viewType == 2 && this.myData.isBuy == 0) { //判断是否需要购买 是否已经购买

					uni.showModal({
						title: '购买后继续观看',
						content: '是否跳转购买？',
						success: function(res) {
							if (res.confirm) {
								//跳转购买
								console.log("tobuy");
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					this.timer = setInterval(() => {
						// this.videoContext.pause();
						clearInterval(this.timer)

					}, 500)

				} else {

				}

			},

			//监听视频是否暂停
			vdopause: function() {
				console.log("pause");
			},

			//提问按钮响应方法
			confirmDialog() {
				var loginkey = uni.getStorageSync('loginKey');
				if (loginkey.length <= 0) {
					uni.navigateTo({
						url: '../mine/login'
					})
				} else {
					this.$refs.dialogInput.open()
				}

			},

			//回复
			replyBtnClick(item) {
				var loginkey = uni.getStorageSync('loginKey');
				if (loginkey.length <= 0) {
					uni.navigateTo({
						url: '../mine/login'
					})
				} else {
					this.replyItem = item
					this.$refs.dialogInputreply.open()
				}
			},
			//直接点击名称回复
			replyQueser(item, replyUserId) {
				this.replyItem = item
				this.replyUserid = replyUserId
				this.$refs.dialogInputreply.open()
			},

			//确定回复
			replyConfirm(done, val) {
				this.reply(this.replyItem, this.replyUserid, val)
				done();

			},

			//点赞
			likeBtnClick(item) {
				console.log("点赞了");

				var loginkey = uni.getStorageSync('loginKey');

				this.$api.post('index!ajaxGoodCourseQuestion.action', {
					loginKey: loginkey,
					id: item.id,

				}).then(res => {
					if (res.res.status == 0) {
						item.isGood = res.inf.goodType;
						_this.getQues(_this.page)
					} else {
						uni.showModal({
							title: "点赞失败"
						})
					}
				})
			},

			/**
			 * 底部提问
			 */
			dialogInputConfirm(done, val) {
				this.addQues(val)
				done()
			},


		},

	}
</script>

<style lang="scss">
	.topView {
		padding: 0px 0px;
		position: fixed;
		left: 0px;
		right: 0px;
		width: 100%;
		top: 0px;
		z-index: 99;
	}

	video {
		width: 100%;
		height: 225px;
	}


	.scorl_item {
		background-color: #ffffff;
		display: flex;
		height: 45px;
		margin-top: -8px;

		.scorl_child_item {
			text-align: center;
			flex: 1;
			font-size: 16px;
			align-items: center;
			line-height: 45px;
		}
	}

	.selected {
		color: #fd6666;
	}

	.normal {
		color: #666666;
	}

	.line {
		widows: 100%;
		height: 1px;
		background-color: #e6e6e6;
	}


	.showMessage_flexView {
		display: flex;
		align-items: center;
	}

	.showMessage {
		.showMessage_title {
			font-size: 18px;
			// font-weight: bold;
			padding-left: 15px;
			margin-top: 10px;

		}

		.showMessage_autor {
			font-size: 14px;
			padding: 0px 15px;
			color: #666666;
		}



		.showMessage_money {
			margin-left: 15px;
			color: #F66666;
			font-size: 14px;
		}

		.showMessage_ymoney {
			margin-left: 13px;
			color: #666666;
			text-decoration: line-through;
			font-size: 14px;
		}

		.showMesage_watch {
			margin-left: 15px;
			height: 10px;
			width: 15px;
		}

		.showMessage_watchNum {
			margin-left: 5px;
			font-size: 14px;
			line-height: 30px;
			color: #666666;
			flex: 1;


		}

		.showMessage_bottomImg {
			margin-left: 15px;
			height: 20px;
			width: 30rpx;
		}





	}

	.showMessage_selectcourse {
		background-color: #e6e6e6;
		margin-top: 10px;

	}

	.showMessage_selectcourseTitle {
		padding: 10px 15px;
		width: 90px;
		flex: 1;
		font-size: 16px;
	}

	.showMessage_selectcourseItems {
		padding: 10px 5px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-end;

	}

	.showMessage_courseItems {
		border-width: 1px;
		border-color: #000000;
		border-style: solid;
		color: #666666;
		text-align: center;
		line-height: 20px;
		width: 20px;
		height: 20px;
		margin-left: 10px;
	}

	.courserItems_style {
		border-color: #fd6666;
		color: #fd6666;
	}


	.belongCollege {
		// height: 380upx;

		// background-color: #FF976A;
		.belongCollegeTitle {
			padding: 10px 15px;
			width: 90px;
			flex: 1;
			font-size: 16px;
		}


		.belongCollegeMore {
			margin-right: 15px;
			color: #666666;
			font-size: 14px;
		}


		.belongcollegeimg {
			width: 50%;
			height: 280rpx;
			// flex: 1;
		}

		.collegimage {
			padding-top: 0px;
			height: 200upx;
			width: 100%;
			border-radius: 15px;


		}

		.collegeImageTextview {
			width: 100%;
			// line-height: 40px;
			text-align: center;
			font-size: 13px;
			color: #666666;
		}
	}


	.bottomView {
		font-size: 14px;
		padding:10px 20px;
		background-color: #FFFFFF;
	}

	.course_ap {
		width: 100%;
		padding: 15px, 15px;
		text-align: center;
		color: #1057b1;
		font-size: 18px;
		font-weight: bold;

	}

	.fixedBottom {
		position: fixed;
		bottom: 0rpx;
		left: 0px;
		right: 0px;
		height: 45px;
	}

	.scorll_class {
		margin-top: 270px;
		height: calc(100vh - 310px);
		background-color: #FFFFFF;
	}

	.questions {
		line-height: 45px;
		text-align: center;
		background-color: #fd6666;
		font-size: 16px;
		color: #FFFFFF;
	}


	.buy_class {
		display: flex;
		height: 45px;
	}


	.quesView {
		background-color: #FFFFFF;

		.quesUser {
			margin-top: 0px;
			margin-left: 0px;
			height: 60px;
			width: 100%;
			display: flex;
		}

		.quesImg {
			margin-top: 10px;
			margin-left: 15px;
			width: 40px;
			height: 40px;
			background-color: #666666;
		}

		.quesName {
			margin-top: 15px;
			margin-left: 10px;
			font-size: 14px;
			flex: 1;
		}

		.quesTopUser {
			margin-left: 0px;
			width: 100%;

		}

		.quesTime {
			margin-right: 15px;
			margin-top: 16px;
			font-size: 13px;
			color: #666666;
		}

		.quesMessage {
			font-size: 12px;
			margin-top: 20px;
			margin-left: 10px;
		}

		.quesReply {
			margin-top: 10px;
			margin-left: 60px;
			font-size: 12px;
			width: calc(100vw - 80px);
			background-color: #f5f5f5;
			color: #666666;

			.quesReplyView {
				font-size: 12px;
				line-height: 15px;
				padding: 3px 5px;
			}

			text {
				color: #0066CC;
				font-size: 12px;

			}
		}

		.quesBtns {
			display: flex;
			justify-content: flex-end;

			.quesLike {
				margin-top: 10px;
				margin-right: 15px;

				button {
					width: 80px;
					height: 25px;
					border-radius: 12.5px;
					border: 1px solid #f5f5f5;
					font-size: 12px;
					display: flex;
					align-items: center;
					color: #666666;
					background-color: #FFFFFF;

					image {
						width: 15px;
						height: 10px;
					}
				}

			}

			.quesReplybtn {
				margin-top: 10px;
				margin-left: 20px;

				button {
					width: 80px;
					height: 25px;
					border-radius: 12.5px;
					border: 1.5px solid #f5f5f5;
					font-size: 12px;
					display: flex;
					align-items: center;
					color: #666666;
					background-color: #FFFFFF;

					image {
						width: 10px;
						height: 10px;
					}
				}

			}
		}

	}
</style>

<template>



	<view>
		<view class="">
			<view class="topView">
				<view>
					<video id="myVideo" :src="videoUrl" direction="-90" enable-progress-gesture="false" auto-pause-if-navigate="true"
					 auto-pause-if-open-native="true" @play="vdoPlay" @error="videoErrorCallback" @pause="vdopause" @ended="videoEnd"
					 @timeupdate="vedioTimeUpDate" style="z-index: 1;">
					</video>
				</view>

				<view class="scorl_item">
					
					
					<view class="scorl_child_item" v-bind:class="[selectIndex==0?'scorl_child_item_select':'']" @click="itemSelect(0)">介绍</view>
					<view class="scorl_child_item" v-bind:class="[selectIndex==1?'scorl_child_item_select':'']" @click="itemSelect(1)">提问</view>
					<view v-if="myData.isHasTest ==1" class="scorl_child_item" v-bind:class="[selectIndex==2?'scorl_child_item_select':'']" @click="itemSelect(2)">测试</view>
				</view>
				<view class="line"></view>
			</view>

			<!-- <scroll-view class="scorll_class" scroll-y="flase"> -->
			<view v-if="selectIndex==0" class="scorll_class">
				<view class="showMessage">
					<view class="showMessage_title">{{myData.title}}</view>
					<view class="showMessage_flexView">
						<view class="showMessage_autor">讲师：{{myData.author}}</view>
						<view class="showMessage_autor">{{myData.expiredDuration.length>0?'有效期'+myData.expiredDuration:''}}</view>
					</view>
					<view class="showMessage_flexView">
						<view class="showMessage_money">￥{{myData.buyPrice}}</view>
						<view class="showMessage_ymoney">￥{{myData.isJoin}}</view>
					</view>
					<view class="showMessage_flexView">
						<image class="showMesage_watch" src="../../static/image/home/vdodetail/watchCount@2x.png" mode=""></image>
						<view class="showMessage_watchNum">{{myData.viewNum}}</view>
						<view class="" style="margin-right: 20rpx;display: flex;align-items: center;">
							<image class="showMessage_bottomImg" src="../../static/image/home/vdodetail/comments@2x.png" mode="" @click="commentClick()"></image>
							<image v-if="myData.isCollect==0" class="showMessage_bottomImg" src="../../static/image/home/vdodetail/collection_g@2x.png"
							 mode="" @click="likeClick()"></image>
							<image v-else-if="myData.isCollect==1" class="showMessage_bottomImg" src="../../static/image/home/vdodetail/collection_o@2x.png"
							 mode="" @click="likeClick()"></image>
							<!-- <image class="showMessage_bottomImg" src="../../static/image/home/vdodetail/shareHui@2x.png" mode="" @click="shareClick()"></image> -->
						</view>
					</view>

				</view>

				<view class="showMessage_flexView showMessage_selectcourse">
					<view class="showMessage_selectcourseTitle">课程选集</view>
					<view class="showMessage_selectcourseItems">
						<view class="showMessage_courseItems " v-bind:class="[itemSelectIndex==index?'courserItems_style':'']" v-for="(item, index) in myData.parts"
						 :key="item.partTitle" @click="courseItemsSelct(index,item)">
							{{item.partTitle}}
						</view>
					</view>
				</view>
				<view class="belongCollege" v-if="!collegeId">
					<view class="showMessage_flexView">
						<view class="belongCollegeTitle">所属学院</view>
						<view class="belongCollegeMore" @click="moreClick(myData.id)">更多 ⟩</view>
					</view>
					<view class="showMessage_flexView">
						<view class="belongcollegeimg" v-for="(item,index) in myData.colleges" :key="index" @click="collegeItemClick(item)">
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
						<image class="quesImg" :src="baseUrl+item.imgUrl" mode=""></image>

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


			<view v-if="selectIndex==2" class="scorll_class">
				<view class="test_item" v-for="(item,index) in testArr" :key="index">
					<view class="test_flex">
						<view class="test_text">
							{{item.examName}}
						</view>
						<view class="test_btn" :class="[item.examScore.length>0?'':item.isCompleted == '1'?'test_btn_ok':'']">
							{{item.examScore.length>0?item.examScore:'去测试'}}
						</view>
					</view>
					<view class="line"></view>
				</view>
			</view>

			<!-- </scroll-view> -->


			<view class="" style="height: 45px;">
				<view class="fixedBottom">


					<view v-if="selectIndex==1" class="questions" @click="confirmDialog">
						提问
					</view>
					<view class="buy_class" v-else-if="myData.viewType ==0">
						<view style="background-color: #e8654b;width: 50%;color: #FFFFFF; flex: 1;">
							<view style="width: 100%;text-align: center;font-size: 14px;line-height: 45px;padding: 0px 0px;">
								已购买
							</view>
						</view>
					</view>
					<view v-else-if="selectIndex==0 && myData.viewType !==0" class="buy_class">
						<view style="background-color: #e8654b;width: 50%;color: #FFFFFF; flex: 1;" @click="tobuy()">
							<view style="width: 100%;text-align: center;font-size: 14px;line-height: 22.5px;padding: 0px 0px;">
								{{myData.isBuy==1?'已购买':'单独购买'}}
							</view>
							<view style="width: 100%;text-align: center;font-size: 14px;line-height: 22.5px;padding: 0px 0px;">
								{{myData.isBuy==1?'到期时间'+myData.remainDays:'￥'+myData.buyPrice}}
							</view>
						</view>
						<view v-if="!collegeId" style="font-size: 16px;color:#e8654b ;background-color: #f3cbc3;text-align: center;line-height: 45px;width: 50%;">
							查看所属学院
						</view>
					</view>

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
				collegeId: '',
				selectIndex: 0, //选项卡选项
				itemSelectIndex: 0, //课程选集
				itemSelectClass: 'courserItems_style',
				myData: Object, //数据源
				quesArr: [], //问答数据源
				// iscollege: false, 
				videoUrl: "",
				autoPlay: false,
				baseUrl: "http://39.105.48.243:8080/crlink/",
				loading: "加载更多",
				page: 1, //分页加载
				replyItem: Object,
				replyUserid: '', //回复userID
				videoLastTime: 0, //记录最后播放时间
				videoItem: Object, //视频对象数据模型
				playtime: '', //记录播放进度 39：20/50：20
				seekTime: 0, //历史播放记录
				iscollect: 0, //是否收藏
				testArr: [], //测试数组
			}
		},

		onLoad(e) {
			_this = this;
			this.couserID = e.courseID;
			this.collegeId = e.collegeId;
			this.baseUrl = getApp().globalData.baseUrl 

		},

		onShow() {
			this.getNetMessage();
			this.getQues(this.page);
			this.getExamList()
		},
		onHide() {
			this.uploadVideoPlayTime('NO')

		},
		onUnload() {
			this.uploadVideoPlayTime('NO')
		},



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
			}

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

		methods: {


			//实时监听播放进度
			vedioTimeUpDate(e) {
				//如果间隔超过3秒钟 说明有拖动 返回最后记录的播放时间

				if (this.seekTime > 0) {
					this.videoLastTime = this.seekTime;
					this.videoContext.seek(this.seekTime);
					this.seekTime = 0;
				} else if (parseInt(e.detail.currentTime) - parseInt(this.videoLastTime) > 3 || parseInt(this.videoLastTime) -
					parseInt(e.detail.currentTime) > 3) {
					this.videoContext.seek(this.videoLastTime);

				} else {
					this.videoLastTime = e.detail.currentTime;
				}

			},

			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},


			videoEnd(e) {
				this.uploadVideoPlayTime('YES')
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
						// _this.videoUrl = res.inf.parts[0].videoUrl;
						_this.videoItem = res.inf.parts[0];
						// this.videoContext.pause();  
						console.log("112233");

						//断点播放
						_this.seekTime = res.inf.curPartPlayDuration
						let partN = res.inf.curPartNum
						let partnum = partN.toInteger()

						console.log("partnum = " + partnum + "seektime=" + _this.videoLastTime);
						_this.itemSelectIndex = partnum - 1
						_this.videoItem = res.inf.parts[partnum - 1]


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

							console.log("ques=" + array);
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
						// uni.showModal({
						// 	title: "提交失败"
						// })
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


			//上传播放进度
			uploadVideoPlayTime(bl) {

				let sec = parseInt(this.videoLastTime) % 60
				let min = parseInt(this.videoLastTime) / 60
				let times = parseInt(min) > 0 ? parseInt(min).toString() + '分' : '' + sec.toString() + '秒' + '/' + _this.videoItem.timeStr
				var loginkey = uni.getStorageSync('loginKey');
				var userId = uni.getStorageSync('userId');
				this.$api.post('index!ajaxAddCourseRecordHistory.action', {
					loginKey: loginkey,
					userId: userId,
					courseId: _this.myData.id,
					partNum: _this.videoItem.partTitle,
					coursePartId: _this.videoItem.partId,
					teacherName: _this.myData.author,
					partPlayDuration: parseInt(_this.videoLastTime),
					isCompleted: bl,
					playTime: times,
					imgUrl: _this.myData.imgUrl,
					courseTitle: _this.myData.title,
					watchVideoDuration: ''

				}).then(res => {

					if (res.res.status == 0) {
						// uni.showToast({
						// 	title: '提交学习记录成功'
						// });
						_this.replyUserid = '';
						_this.replyItem.replyArr = res.inf.replyArr;
						console.log("zhihou=" + _this.replyItem.replyArr + _this.quesArr);

					} else {
						// uni.showModal({
						// 	title: '提交失败'
						// })
					}
				})
			},

			//评价
			commentClick() {
				_this.videoContext.pause();

				uni.navigateTo({
					url: './VdoDetail/VideoDetailcomment?courseID=' + _this.couserID
				})
			},

			//收藏
			likeClick() {
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('index!ajaxCollectCourse.action', {
					loginKey: loginkey,
					id: _this.couserID,

				}).then(res => {

					if (res.res.status == 0) {
						_this.myData.isCollect = res.inf.isColl == 1 ? 0 : 1
					} else {
						uni.showModal({
							title: '提交失败'
						})
					}
				})
			},
			//分享
			shareClick() {
				console.log("shareClick");
				uni.share({

					provider: 'weixin',
					scene: "WXSceneSession",
					type: 5,
					imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png',
					title: '欢迎体验uniapp',
					miniProgram: {
						id: 'gh_19f4ac0477a4',
						path: 'pages/home/home',
						type: 0,
						webUrl: 'http://uniapp.dcloud.io'
					},
					success: ret => {
						console.log(JSON.stringify(ret));
					}
				});
			},

			//跳转购买
			tobuy() {

				if (this.myData.isBuy == 0) {
					uni.navigateTo({
						url: './payView/payView?courseId=' + _this.couserID,
					})
				}

			},


			itemSelect: function(e) {
				this.selectIndex = e
				if (e == 2) {
					this.getExamList()
				}

			},

			getExamList() {
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('college!ajaxGetCoursePartExamList.action', {
					loginKey: loginkey,
					courseId: this.couserID
				}).then(res => {
					if (res.res.status == 0) {
						_this.testArr = res.inf.arr
					} else {
						uni.showModal({
							title: res.res.errMsg
						})
					}
				})
			},

			//点击学院按钮
			collegeItemClick(item) {

				_this.videoContext.pause();
				uni.navigateTo({
					url: './college?collegeId=' + item.collegeId
				})

			},

			moreClick(str) {
				console.log("str = " + str);
				_this.videoContext.pause();
				uni.navigateTo({
					url: './moreCollege?id=' + str
				})
			},


			courseItemsSelct: function(e, item) {
				//更换课程 这里调试数据

				if (this.itemSelectIndex !== e) {
					this.videoLastTime = 0;
					this.itemSelectIndex = e;
					console.log("e=" + e + "videourl = " + this.myData.parts[e].videoUrl);
					this.videoItem = item;
				}

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
								_this.tobuy()
								
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					this.timer = setInterval(() => {
						_this.videoContext.pause();
						clearInterval(_this.timer)
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

		watch: {
			videoItem(item) {
				this.videoUrl = item.videoUrl;
			}
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
		}

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
		.scorl_child_item_select{
			color: #e8654b;
		}
	}

	.selected {
		color: #e8654b;
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
			color: #e8654b;
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
		border-color: #e8654b;
		color: #e8654b;
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
		padding: 10px 20px;
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
		// height: calc(100vh - 355px);
		height: auto;
		background-color: #FFFFFF;
	}

	.questions {
		line-height: 45px;
		text-align: center;
		background-color: #e8654b;
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
			width: 45px;
			height: 40px;
			border-radius: 20px;

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

	.test_item {
		background-color: #FFFFFF;

		.test_flex {
			display: flex;
			align-items: center;

			.test_text {
				flex: 1;
				color: #666666;
				font-size: 14px;
				line-height: 40px;
				margin-left: 10px;
			}

			.test_btn {
				border: 1px solid #e6e6e6;
				color: #e6e6e6;
				border-radius: 5px;
				margin-right: 10px;
				font-size: 14px;
				text-align: center;
				line-height: 25px;
				width: 60px;
				height: 25px;
			}

			.test_btn_ok {
				border: 1px solid #e8654b;
				color: #e8654b;
			}
		}
	}
</style>

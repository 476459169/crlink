<template>
	<view class="">
		
		
		<view class="topview">
			<image :src="baseurl+myDataDic.imgUrl" mode="scaleToFill"></image>
		</view>

		<view class="scorlTop" v-bind:class="[isFixedTop?'is_fixed':'']" id="navbar">
			<view class="line"></view>
			<view class="scorlItemView">
				<view class="item_child" v-for="(item,index) in topArr" v-bind:class="[itemSelectIndex==index?'typeItems_style':'']"
				 @click="topItemSelect(index)">{{item}}</view>
			</view>
			<view class="line"></view>
		</view>

		<view v-if="itemSelectIndex==0" class="index_0">
			<view class="showMessage">
				<view class="showMessage_title">{{myDataDic.collegeName}}</view>
				<view class="showMessage_flexView">
					<view class="showMessage_autor">包含：{{myDataDic.courseCount}}节课</view>
					<view class="showMessage_autor">有效期1年</view>
				</view>
				<view class="showMessage_flexView">
					<view class="showMessage_money">￥{{myDataDic.collegeFee}}</view>
					<view class="showMessage_ymoney">￥{{myDataDic.collegeOriginalFee}}</view>
				</view>
				<view class="showMessage_flexView">
					<image class="showMesage_watch" src="../../static/image/home/vdodetail/watchCount@2x.png" mode=""></image>
					<view class="showMessage_watchNum">{{myDataDic.viewNum}}</view>
					<view class="" style="margin-right: 20rpx;display: flex;align-items: center;">
						<image class="showMessage_bottomImg" src="../../static/image/home/vdodetail/comments@2x.png" mode=""></image>
						<image class="showMessage_bottomImg" src="../../static/image/home/vdodetail/collection_g@2x.png" mode=""></image>
						<image class="showMessage_bottomImg" src="../../static/image/home/vdodetail/shareHui@2x.png" mode=""></image>
					</view>
				</view>

			</view>
			<view class="bottomView">
				<rich-text :nodes="myDataDic.content|formatRichText"></rich-text>
			</view>
		</view>

		<view v-else-if="itemSelectIndex==1" class="tableCell" v-for="(item,index) in myData" @click="didselectItem(item)">
			<view class="item">
				<view class="index">01</view>
				<view class="" style="flex: 1;">
					<view class="">{{item.courseTitle}}</view>
					<view class="tableCellItem">讲师：{{item.teacherName}} &nbsp &nbsp {{item.courseDuration}}</view>
					<view class="tableCellItem" style="display: flex;align-items: center;">
						<view class="itemBuybtn">单买</view>
						<view class="moneyItem">
							￥{{item.courseFee}}
						</view>
					</view>
				</view>

				<view class="" style="width: 50px;" v-if="item.isCompulsory == '1'">
					<image class="bx" src="../../static/image/college/bxtb.png" mode=""></image>
				</view>
			</view>

			<view class="line"></view>
		</view>

		<view v-else-if="itemSelectIndex==2" class="teacherView">
			<view class="teacherItem" v-for="(item,index) in teacherData" :key="index">
				<view class="teacherTopView">
					<image :src="baseurl+item.headImgUrl" mode=""></image>
					<view class="titleView">
						<view class="" style="font-size: 13px;">
							{{item.teacherName}}
						</view>
						<view class="" style="font-size: 13px;color: #666666;">
							{{item.teacherJob}}
						</view>
					</view>
				</view>

				<view class="textview">{{item.teacherCompany}}</view>



			</view>

		</view>


		<view class="" style="height: 45px;">
			<view class="fixedBottom">
				<view class="buy_class">
					<view style="background-color: #e8654b;width: 100%;color: #FFFFFF;" @click="tobuy()">
						<view style="width: 100%;text-align: center;font-size: 16px;line-height: 45px;padding: 0px 0px;">
							{{myDataDic.isBuy==1?'已购买(剩余'+myDataDic.remainDays+')':'立即购买￥'+myDataDic.collegeFee}}
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
		name: "nav-bar",
		data() {
			return {
				// isFixed: false, //当滚动条高度大于152时是否定位
				// scrollHeight: 320,
				navbarInitTop: 0,
				isFixedTop: false,
				// stillFixe:false,
				// lastScorlH:0,
				topArr: ['学院介绍', '课程列表', '讲师介绍'],
				collegeId: '',
				myData: ['1', '2'],
				myDataDic: Object,
				teacherData: [],
				itemSelectIndex: 1,
				baseurl: "http://39.105.48.243:8080/crlink/",

			};
		},

		onLoad(e) {

			//获取数据
			_this = this;
			_this.collegeId = e.collegeId;

			this.getListData()
			this.getTeacherData()

		},
		mounted() {
			this.getTopViewHeight();
		},
		methods: {

			//获取列表数据
			getListData() {
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('college!ajaxGetCollegeDetailNew.action', {
					collegeId: _this.collegeId,
					loginKey: loginkey
				}).then(res => {
					if (res.res.status == 0) {
						_this.myData = res.inf.arr;
						_this.myDataDic = res.inf;
					} else {
						uni.showToast({
							title: res.res.errMsg
						})
					}
				})
			},

			//获取老师数据
			getTeacherData() {
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('college!ajaxGetCollegeTeacherIntro.action', {
					collegeId: _this.collegeId,
					loginKey: loginkey
				}).then(res => {
					if (res.res.status == 0) {
						_this.teacherData = res.inf.arr;
					} else {
						uni.showToast({
							title: res.res.errMsg
						})
					}
				})
			},

			didselectItem(item) {
				uni.navigateTo({
					url: './videoDetail?courseID=' + item.courseId+'&&collegeId='+this.collegeId,
					success() { 

					}
				})
			},
			
			//跳转购买页面
			tobuy(){
				if (_this.myDataDic.isBuy!==1){
					uni.navigateTo({
						url:'./payView/payView?collegeId='+_this.collegeId,
						success() {
							
						}
					})
				}

				
			},
			//顶部选项卡选择
			topItemSelect(e) {
				this.itemSelectIndex = e;
				// if(this.isFixedTop==true){
				// 	this.stillFixe = true;
				// }
			},
			//获取节点距离顶部的距离
			getTopViewHeight() {
				var that = this;
				uni.createSelectorQuery().select('#navbar').boundingClientRect(function(rect) {
					if (rect && rect.top > 0) {
						var navbarInitTop = parseInt(rect.top);
						that.navbarInitTop = navbarInitTop
					}
				}).exec();
			}



		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {

		},

		/**
		 * 监听页面滑动事件
		 */
		onPageScroll: function(e) {
			var that = this;
			var scrollTop = parseInt(e.scrollTop); //滚动条距离顶部高度
			// console.log("scrollTop =" + scrollTop);
			// that.lastScorlH = scrollTop;
			//判断'滚动条'滚动的距离 和 '元素在初始时'距顶部的距离进行判断
			var isSatisfy = scrollTop >= that.navbarInitTop ? true : false;
			//为了防止不停的setData, 这儿做了一个等式判断。 只有处于吸顶的临界值才会不相等
			if (that.isFixedTop === isSatisfy) {
				return false;
			}
			that.isFixedTop = isSatisfy

		},
		filters: {
			formatRichText(html) { //控制小程序中图片大小
				if (html) {
					let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
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


	};
</script>

<style lang="scss">
	.topview {
		width: 100%;
		height: 320rpx;
		background-color: #000000;

		image {
			width: 100%;
			height: 320rpx;
		}
	}

	.is_fixed {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 999;
	}

	.navbar {
		width: 100%;
		height: 45px;
	}

	.scorlTop {
		width: 100%;
		height: auto;
		background-color: #FFFFFF;

		.line {
			width: 100%;
			height: 1px;
			background-color: #e6e6e6;
		}

		.scorlItemView {
			display: flex;
			align-items: center;

			.item_child {
				width: 100%;
				line-height: 45px;
				text-align: center;
				color: #666666;
				flex: 1;
			}

			.typeItems_style {
				color: #e8654b;
				font-size: 15px;
			}
		}

	}



	.tableCell {
		.item {
			width: 100%;
			height: 220rpx;
			display: flex;
			align-items: center;
			background-color: #FFFFFF;

			.itemBuybtn {
				background-color: #e8654b;
				height: 20px;
				border-radius: 10px;
				width: 45px;
				color: #FFFFFF;
				font-size: 14px;
				text-align: center;
				line-height: 20px;
				font-size: 12px;
			}

			.moneyItem {
				margin-left: 15px;
				color: #e8654b;
				font-size: 14px;
			}

			.tableCellItem_title {}

			.tableCellItem {
				color: #666666;
			}
		}


	}

	.index {
		color: #666666;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 16px;
		line-height: 110px;
		width: 130rpx;
		text-align: center;
	}

	.bx {
		width: 35px;
		height: 35px;
		margin-top: -25px;
	}

	.line {
		width: 100%;
		height: 1px;
		background-color: #e6e6e6;
	}


	.index_0 {
		width: 100%;
		height: auto;

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

		.showMessage_flexView {
			display: flex;
			align-items: center;
		}
	}

	.bottomView {
		font-size: 18px;
		padding: 15px;
	}

	.teacherView {
		background-color: #eceff3;
		width: 100%;
		height: auto;

		.teacherItem {
			margin: 5px 10px;
			background-color: #FFFFFF;
			height: auto;

			.textview {
				padding: 10px 15px;
				line-height: 20px;
				color: #666666;
				font-size: 13px;
			}
		}

		.teacherTopView {
			display: flex;

			image {
				margin-top: 10px;
				margin-left: 15px;
				width: 40px;
				height: 40px;
				border-radius: 20px;
			}

			.titleView {
				flex: 1;
				margin-left: 10px;
				padding: 5px;
			}
		}
	}

	.fixedBottom {
		position: fixed;
		bottom: 0rpx;
		left: 0px;
		right: 0px;
		height: 45px;
	}

	.buy_class {
		display: flex;
		height: 45px;
	}
</style>

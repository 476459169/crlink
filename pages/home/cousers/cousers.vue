<template>
	<view>
		<view class="topView">
			<view class="search">
				<view class="search_view">
					<image class="image_search" src="../../../static/image/cousers/search.png" mode=""></image>
					<input class="input_v" type="text" v-model="searchValue" value="searchValue" placeholder="输入课程或老师关键字搜索相关课程"
					 confirm-type="search" @confirm="search()" />
				</view>

				<view class="type_View">
					<view class="couserType" @click="typeClick(1)">
						<view class="">{{couserStr}}</view>
						<image v-if="typeSelectInedx==1" class="image_type" src="../../../static/image/cousers/upcrrow.png" mode=""></image>
						<image v-else class="image_type" src="../../../static/image/cousers/downcrrow.png" mode=""></image>
					</view>
					<view class="lbType" @click="typeClick(2)">
						<view class="">{{lbStr}}</view>
						<image v-if="typeSelectInedx==2" class="image_type" src="../../../static/image/cousers/upcrrow.png" mode=""></image>
						<image v-else class="image_type" src="../../../static/image/cousers/downcrrow.png" mode=""></image>
					</view>
				</view>

			</view>
			<view class="line"></view>
			<view class="upDownList" v-if="listShow" v-for="(item,index) in selectArr" :key="index" @click="upDownItemClick(item)">
				<text v-bind:class="[ item.title?item.title==lbStr?'upDownText':'':couserStr==item.name ?'upDownText':'']">
					{{item.title?item.title:item.name}}</text>
				<view class="line"></view>
			</view>
		</view>

		<view class="listView">
			<view class="course" v-for="(item, index) in listArr" :key="index" @click="itemClick(item)">
				<image :src="baseurl+item.imgUrl" class="itemImage"></image>
				<view class="itemContent">
					<view style="font-size: 17px;">
						{{item.name}}
					</view>
					<view style="color: #666666; font-size: 16px;">
						包含：{{item.courseCount}}节
					</view>
					<view style="display: flex;">
						<view class="text_money">
							¥{{item.sellFee}}
						</view>
						<view class="text_xh">
							¥{{item.originalFee}}
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
				baseurl: "http://39.105.48.243:8080/crlink/",
				couserArr: [],
				lbArr: [],
				selectArr: [],
				listArr: [],
				searchValue: '',
				couserStr: '全部课程',
				lbStr: '所有类别',
				selCourseConditionId: '', //课程分类
				lbTypeId: '', //类别
				pages: 1, //下拉index
				listShow: false,
				typeSelectInedx: 0, //记录那个按钮被选中
			}
		},
		onLoad() {
			_this = this;
			_this.getCouserType()
			_this.getLBType()
			_this.getMianData(1)
		},
		onPullDownRefresh: function() {
			this.pages = 1;
			this.getMianData(this.pages) 

		},

		onReachBottom: function() { //当划到最底部的时候触发事件
			 if (timer != null) { //加载缓冲延迟
			 	clearTimeout(timer);
			 }
			 timer = setTimeout(function() {
			 	_this.getMianData(_this.pages);
			 }, 600); 
		},

		methods: {

			getMianData(pages) {
				
				uni.showNavigationBarLoading();
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('index!ajaxQueryCollege.action', {
					firstIndex: pages,
					selCourseCondition: _this.selCourseConditionId,
					typeId: _this.lbTypeId,
					loginKey: loginkey,
					queryWord:_this.searchValue
				}).then(res => {
					if (res.res.status == 0) {

						if (pages == 1) {
							_this.listArr = res.inf.arr
							_this.pages++;
						}else{
							if (pages <= res.inf.pageCount) {
								_this.listArr = _this.listArr.concat(res.inf.arr); //进行数据的累加
								_this.pages++; //页数的++
								_this.loading = "加载更多";
								}else{
									uni.showToast({
										title:"没有更多了···"
									})
								}
						}
						
					} else {
						uni.showToast({
							title: res.res.errMsg
						})
					}
					
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh(); //数据加载完成,刷新结束
				})
			},

			getCouserType() {
				this.$api.post('index!ajaxGetCourseCondition.action').then(res => {
					if (res.res.status == 0) {
						_this.couserArr = res.inf.arr;
					} else {
						uni.showToast({
							title: res.res.errMsg
						})
					}
				})
			},

			getLBType() {

				this.$api.post('index!ajaxGetCourseType.action', {
					platform: "ios"
				}).then(res => {
						if (res.res.status == 0) {

						_this.lbArr = res.inf.arr;
						_this.lbArr.unshift({id:"",title:"所有类别"})

					} else {
						uni.showToast({
							title: res.res.errMsg
						})
					}
				})
		},

		search() {
			_this.pages=1
			_this.getMianData(_this.pages)
		},
		itemClick(item) {
			if	(item.flag =="college"){
				uni.navigateTo({
					url:'../college?collegeId='+item.id
				})
			}else{
				uni.navigateTo({
					url:'../videoDetail?courseID='+item.id
				})
			}
			
		},

		upDownItemClick(item) {

			if (item.name) {
				if(item.name!==_this.couserStr){
					_this.couserStr = item.name
					_this.selCourseConditionId = item.key
					_this.pages = 1;
				}
				
			} else {
				if(item.title!==_this.lbStr){
				_this.lbStr = item.title
				_this.lbTypeId = item.id
					_this.pages = 1;
				}
			}
			
			
			_this.selectArr = []
			_this.typeSelectInedx = 0
			_this.listShow = false
			
			_this.getMianData(1)
			
		},

		typeClick(e) {
			if (_this.typeSelectInedx !== e) {
				_this.selectArr = e == 1 ? _this.couserArr : _this.lbArr
				_this.listShow = true
				_this.typeSelectInedx = e;
			} else {
				_this.selectArr = []
				_this.listShow = false
				_this.typeSelectInedx = 0;
			}
		}
	}
	}
</script>

<style lang="scss">
	.topView {
		position: fixed;
		top: 0px;
		width: 100%;
		z-index: 10;
		background-color: #f3f3f3;


	}

	.search {
		width: 100%;
		margin-top: 0px;
		padding: 0px;

		.search_view {
			margin: 10px 15px;
			padding: 10px;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			border-radius: 5px;

			.image_search {
				width: 20px;
				height: 20px;
			}

			.input_v {
				font-size: 14px;
				color: #666666;
				flex: 1;
				margin-left: 10px;
			}

		}
	}




	.type_View {
		background-color: #FFFFFF;
		display: flex;
		height: 45px;
		align-items: center;
		color: #666666;

		.couserType {
			width: 50%;
			align-items: center;
			justify-content: center;
			display: flex;
			font-size: 14px;
		}

		.lbType {
			width: 50%;
			align-items: center;
			justify-content: center;
			display: flex;
			font-size: 14px;
		}

		.image_type {
			width: 10px;
			height: 5px;
			margin-left: 5px;
		}
	}


	.listView {
		margin-top: 105px;
		width: 100%;
	}

	.course {
		padding: 10upx 0upx;
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


	.line {
		width: 100%;
		height: 1px;
		background-color: #e6e6e6;
	}

	.upDownList {
		background-color: #FFFFFF;
		color: #666666;
		height: 40px;
		align-items: center;
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
</style>

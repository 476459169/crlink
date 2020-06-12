<template>

	<view class="">
		<view class="topView">
			<view class="search">
				<view class="search_view">
					<image class="image_search" src="../../static/image/cousers/search.png" mode=""></image>
					<input class="input_v" type="text" v-model="searchValue" value="searchValue" placeholder="输入证书编号进行查询" confirm-type="search"
					 @confirm="search()" />
				</view>
			</view>
		</view>

		<view class="" style="margin-top: 70px;">
			<view v-if="hiddenShowImage==false" class="none_showView">
				<image class="show_image" src="../../static/image/myCertif/nodata@2x.png" mode=""></image>
			</view>
			
			<view class="listView" v-for="(item,index) in dataArr" :key="index" @click="itemClick(item)">
				<image class="listView_img" src="../../static/image/myCertif/cerIcon@2x.png" mode=""></image>
				<view class="listView_content">
					<view class="content_title">
						{{item.certNo}}
					</view>
					<view class="content_center">
						<view class="center_text">
							{{item.name}}
						</view>
						<view class="center_bz">
							{{item.certType}}
						</view>
					</view>
					<view class="content_name">
						{{item.userName}}
					</view>
				</view>
			</view>
		</view>
		
	</view>





</template>

<script>
	var self;
	export default {
		data() {
			return {
				searchValue: '',
				page: 1,
				dataArr: [],
				hiddenShowImage: false
			}
		},
		onLoad() {
			self = this
		},
		onPullDownRefresh() {
			self.page = 1
			self.getData(self.page)

		},
		onReachBottom() {
			self.getData(self.page)
		},
		methods: {
			search() {
				console.log("search");
				self.getData(self.page)
			},

			getData(e) {
				
				if(self.searchValue.length>0){
					let loginkey = uni.getStorageSync('loginKey')
					this.$api.post('user!ajaxGetCertificate.action', {
						certNo: self.searchValue,
						loginKey: loginkey,
						firstIndex: e,
					
					}).then(res => {
						if (res.res.status == 0) {
					
							if (e == 1) {
								self.dataArr = res.inf.arr
								self.page++;
					
					
							} else {
								if (e <= res.inf.pageCount) {
									self.dataArr = self.dataArr.concat(res.inf.arr); //进行数据的累加
									self.page++; //页数的++
									self.loading = "加载更多";
								} else {
									
									uni.hideLoading()
									uni.showToast({
										title: "没有更多了"
									});
								}
							}
					
							if (self.dataArr.length > 0) {
								self.hiddenShowImage = true
							} else {
								self.hiddenShowImage = false
								uni.showToast({
									title: "未查询到对应证书"
								})
							}
					
					
						}else{
							
						}
						uni.hideNavigationBarLoading()
						uni.stopPullDownRefresh()
					})
				}else{
					uni.hideNavigationBarLoading()
					uni.stopPullDownRefresh()
				}
				
			},
			
			itemClick(item){
				uni.navigateTo({
					url:'./certSearchDetail?id='+item.id
				})
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


	.listView {
		// padding: 15px;
		
		margin: 15px;
		border-radius: 5px;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;

		.listView_img {
			padding: 15px;
			width: 30px;
			height: 35px;
		}

		.listView_content {
			flex: 1;
			padding: 10px 0px;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.content_title {
				font-size: 16px;
				color: #333333;

			}

			.content_center {

				display: flex;
				color: #666666;
				font-size: 14px;

				.center_text {
					flex: 1;
				}

				.center_bz {
					margin-right: 10px;
					border: 1px solid #e8654b;
					border-radius: 5px;
					width: 60px;
					height: 25px;
					color: #e8654b;
					font-size: 13px;
					text-align: center;
					line-height: 25px;
				}
			}

			.content_name {
				color: #666666;
			}
		}


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

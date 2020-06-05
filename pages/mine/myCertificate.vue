<template>

	<view>

		<view class="bottom_z1">
			<image src="../../static/image/myCertif/fd.png" mode=""></image>
		</view>

		<view class="list">
			<view class="list_cell" v-for="(item,index) in dataArr" @click="itemClick(item)">
				<view class="flex_class">
					<image class="flex_class_image" src="../../static/image/myCertif/tb.png" mode=""></image>
					<view class="cell_content">
						<view class="cell_content_item">
							<image class="cell_content_item_image" src="../../static/image/myCertif/icon.png" mode=""></image>
							<text class="cell_content_item_text">{{item.name}}</text>
						</view>
						<view class="cell_content_item">
							<image class="cell_content_item_image" src="../../static/image/myCertif/icon.png" mode=""></image>
							<text class="cell_content_item_text">{{item.certNo}}</text>
						</view>
						<view class="cell_content_item">
							<image class="cell_content_item_image" src="../../static/image/myCertif/icon.png" mode=""></image>
							<text class="cell_content_item_text">{{item.awardTime}}</text>
						</view>
					</view>
				</view>

				<image class="list_xx" src="../../static/image/myCertif/xx.png" mode=""></image>
				<image class="list_jj" v-if="index==1" src="../../static/image/myCertif/xj.png" mode=""></image>
			</view>
		</view>

		<view class="bottom_z2">
			<image src="../../static/image/myCertif/fm.png" mode=""></image>
		</view>




	</view>

</template>

<script>
	export default {
		data() {
			return {
				dataArr: []
			}
		},
		onLoad() {
			this.getMyCert()
		},
		methods: {

			getMyCert() {
				var that = this;
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('user!ajaxGetMyCertificate.action', {
					loginKey: loginkey
				}).then(res => {
					if (res.res.status == 0) {
						that.dataArr = res.inf.arr
					} else {

					}
				})
			},
			
			itemClick(item){
				
			}
		}

	}
</script>

<style lang="scss">
	.bottom_z1 {
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 500upx;
		z-index: 1;

		image {
			width: 100%;
			height: 100%;

		}
	}

	.bottom_z2 {
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 250upx;
		z-index: 3;

		image {
			width: 100%;
			height: 100%;

		}
	}

	.list {
		position: relative;
		margin: 20px;
		height: calc(100vh - 100upx);
		background-color: #FFFFFF;
		z-index: 2;

		.list_cell {
			padding: 0px;
			position: relative;
		}

		.flex_class {
			display: flex;
		}

		.flex_class_image {
			width: 80px;
			height: 110px;
			padding: 20px 20px;
		}

		.cell_content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
		}

		.cell_content_item {
			display: flex;
			align-items: center;
			padding: 5px;

		}

		.cell_content_item_image {
			width: 10px;
			height: 10px;
			padding: 5px;
		}

		.cell_content_item_text {

			color: #666666;
			font-size: 14px;
		}

		.list_xx {
			width: calc(100vw - 60px);
			height: 1px;
		}
		
		.list_jj{
			position: fixed;
			right: 20px;
			top: 20px;
			width: 30px;
			height: 20px;
		}

	}
</style>

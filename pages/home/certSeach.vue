<template>
	
	<view class="topView">
		<view class="search">
			<view class="search_view">
				<image class="image_search" src="../../static/image/cousers/search.png" mode=""></image>
				<input class="input_v" type="text" v-model="searchValue" value="searchValue" placeholder="输入证书编号进行查询"
				 confirm-type="search" @confirm="search()" />
			</view>
	</view>
	</view>
</template>

<script>
	export default{
		data(){
				return{
					searchValue:''
				}
		},
		methods:{
			search(){
				 
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
	
</style>

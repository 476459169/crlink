<template>
	<view class="">
		<image  :src="baseUrl+imgUrl" mode="widthFix"></image>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				imgUrl:'',
				baseUrl:''
			}
		},
		onLoad(e) {
			this.imgUrl = e.imgUrl
			this.baseUrl =  getApp().globalData.baseUrl
		}
	}
</script>

<style>
	image{
		background-size:contain|cover;
		width:100%;
		height: auto;
	}
</style>

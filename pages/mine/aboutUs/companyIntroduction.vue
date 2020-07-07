<template>

	<view class="">
		<web-view :webview-styles="webviewStyles" :src="baseUrl+'company!index.action'"></web-view>

	</view>
</template>

<script>
	export default {

		data() {

			return {
				baseUrl: "http://39.105.48.243:8080/crlink/",
				selectIndex: 1,
				collegeArr: [],
				couserArr: []
			};
		},

		onLoad() {
			this.baseUrl =  getApp().globalData.baseUrl
		},

	}
</script>

<style lang="scss">
</style>

<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide'); 
		},

		globalData: {
			baseUrl: 'https://uat.crlink.com/crlink/'
			// baseUrl:'http://39.105.48.243/crlink/'
		}
	};
</script>

<style>
	@import url("./common/uni.css");
	;

	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */
	page {
		background-color: #F8F8F8;
	}
</style>

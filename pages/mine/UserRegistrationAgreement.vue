<template>
    <view>
        <web-view :webview-styles="webviewStyles" src="http://39.105.48.243:8080/crlink/info!index"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        }
    }
</script>

<style>

</style>
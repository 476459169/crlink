(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/mine"],{"0f60":function(n,o,e){"use strict";e.r(o);var t=e("a36a"),i=e("3e34");for(var a in i)"default"!==a&&function(n){e.d(o,n,(function(){return i[n]}))}(a);e("b5a2");var c,l=e("f0c5"),u=Object(l["a"])(i["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],c);o["default"]=u.exports},"3e34":function(n,o,e){"use strict";e.r(o);var t=e("75d2"),i=e.n(t);for(var a in t)"default"!==a&&function(n){e.d(o,n,(function(){return t[n]}))}(a);o["default"]=i.a},"44ef":function(n,o,e){},"75d2":function(n,o,e){"use strict";(function(n){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var e={data:function(){return{islogin:!1,userInfo:Object,baseUrl:"https://uat.crlink.com/crlink/"}},onLoad:function(){this.baseUrl=getApp().globalData.baseUrl,console.log("onload")},onShow:function(){this.getuserInfo()},onPullDownRefresh:function(){n.hideNavigationBarLoading(),n.stopPullDownRefresh()},onReachBottom:function(){n.hideNavigationBarLoading(),n.stopPullDownRefresh()},methods:{getuserInfo:function(){var o=this,e=n.getStorageSync("loginKey");this.$api.post("user!ajaxGetUserInfo.action",{loginKey:e}).then((function(e){0==e.res.status?(o.userInfo=e.inf,o.islogin=!0):(o.islogin=!1,n.removeStorageSync("loginKey"),n.removeStorageSync("userId"),n.removeStorageSync("isFill"))}))},login:function(){var o=n.getStorageSync("loginKey");o.length>0?n.navigateTo({url:"./setting"}):n.navigateTo({url:"./login",success:function(n){console.log("navitologin")}})},logOut:function(){var o=this;n.showModal({title:"提示",content:"确定退出",success:function(e){e.confirm?(n.removeStorageSync("isFill"),n.removeStorageSync("userId"),n.removeStorage({key:"loginKey",success:function(){console.log("点击了退出"),o.islogin=!1}})):e.cancel&&console.log("用户点击取消")}})},settting:function(){var o=n.getStorageSync("loginKey");console.log("loginkey ="+o),o?n.navigateTo({url:"./setting",success:function(){}}):n.navigateTo({url:"./login"})},watchRecord:function(){var o=n.getStorageSync("loginKey");console.log("loginkey ="+o),o?n.navigateTo({url:"./watchRecord/watchRecord",success:function(){}}):n.navigateTo({url:"./login"})},studyRecord:function(){var o=n.getStorageSync("loginKey");console.log("loginkey ="+o),o?n.navigateTo({url:"./studyRecord/studyRecord",success:function(){}}):n.navigateTo({url:"./login"})},myCert:function(){var o=n.getStorageSync("loginKey");console.log("loginkey ="+o),o?n.navigateTo({url:"./myCertificate",success:function(){}}):n.navigateTo({url:"./login"})},aboutUs:function(){var o=n.getStorageSync("loginKey");console.log("loginkey ="+o),o?n.navigateTo({url:"./aboutUs/aboutUs",success:function(){}}):n.navigateTo({url:"./login"})},myCourse:function(){var o=n.getStorageSync("loginKey");console.log("loginkey ="+o),o?n.navigateTo({url:"./myCourse/myCourse",success:function(){}}):n.navigateTo({url:"./login"})},myColle:function(){var o=n.getStorageSync("loginKey");console.log("loginkey ="+o),o?n.navigateTo({url:"./myCourse/myCollection",success:function(){}}):n.navigateTo({url:"./login"})}}};o.default=e}).call(this,e("543d")["default"])},a36a:function(n,o,e){"use strict";var t,i=function(){var n=this,o=n.$createElement;n._self._c},a=[];e.d(o,"b",(function(){return i})),e.d(o,"c",(function(){return a})),e.d(o,"a",(function(){return t}))},b5a2:function(n,o,e){"use strict";var t=e("44ef"),i=e.n(t);i.a},efd9:function(n,o,e){"use strict";(function(n){e("f645");t(e("66fd"));var o=t(e("0f60"));function t(n){return n&&n.__esModule?n:{default:n}}n(o.default)}).call(this,e("543d")["createPage"])}},[["efd9","common/runtime","common/vendor"]]]);
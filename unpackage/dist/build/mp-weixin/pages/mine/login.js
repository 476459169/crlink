(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/login"],{"009d":function(e,t,n){"use strict";(function(e){var n;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={data:function(){return{phoneNum:null,VerificationCode:null,VerificationMes:"获取验证码",disabled:!1,loginInfo:Object,scope:0}},onShow:function(){var t=e.getStorageSync("isFill");"true"!==t&&(e.removeStorageSync("userId"),e.removeStorageSync("loginKey"))},onLoad:function(){n=this,e.getSetting({success:function(e){console.log("授权：",e),e.authSetting["scope.userInfo"]?(console.log("当前已授权"),n.scope=1):(console.log("当前未授权"),n.scope=0)}})},methods:{jumpToRegist:function(){e.navigateTo({url:"./regist",success:function(e){},fail:function(){},complete:function(){}})},getVerificationCode:function(){var t=this;if(this.phoneNum&&11===this.phoneNum.length){var n=0;this.disabled=!0,this.VerificationMes="60s",this.timer=setInterval((function(){n+=1,console.log("ii="+n),t.VerificationMes=(60-n).toString()+"s",30==n&&(t.disabled=!1,t.VerificationMes="获取验证码",n=0,clearInterval(t.timer))}),1e3),this.$api.post("login!ajaxGetPhoneCode.action",{tel:this.phoneNum}).then((function(e){0==e.res.status&&console.log("获取验证码成功")}))}else e.showToast({title:"请输入正确的手机号！"})},login:function(){11==this.phoneNum.length&&this.VerificationCode.length>0?this.$api.post("login!ajaxLogin.action",{tel:this.phoneNum,phoneCode:this.VerificationCode}).then((function(t){if(0==t.res.status){var n=t.inf;console.log(n),e.setStorageSync("userId",n.userId),e.setStorage({key:"loginKey",data:n.loginKey,success:function(){e.showToast({title:"登录中···"}),setTimeout((function(){e.navigateBack({delta:1})}),1500)}})}})):e.showToast({title:"请检查填写项！"})},bindGetUserInfo:function(){var t=this;e.login({provider:"weixin",success:function(n){console.log(n);var o=n.code;e.getUserInfo({provider:"weixin",success:function(n){console.log(n),console.log("用户昵称为："+n.userInfo.nickName);var i={code:o,encryptedData:n.encryptedData,iv:n.iv,rawData:n.rawData,signature:n.signature};t.$api.post("login!ajaxLoginByJSAPI.action",i).then((function(t){0==t.res.status&&(console.log("loginres ="+t),0==t.inf.isFill?e.setStorage({key:"loginKey",data:t.inf.loginKey,success:function(){e.showToast({title:"微信登录中···"}),setTimeout((function(){e.navigateTo({url:"./bindPhoneNumb"})}),1e3)}}):e.setStorage({key:"loginKey",data:t.inf.loginKey,success:function(){e.showToast({title:"微信登录中···"}),setTimeout((function(){e.navigateBack({delta:1})}),1e3)}}))}))}})}})}}};t.default=o}).call(this,n("543d")["default"])},"135b":function(e,t,n){},"5cda":function(e,t,n){"use strict";var o=n("135b"),i=n.n(o);i.a},"79a0":function(e,t,n){"use strict";n.r(t);var o=n("f765"),i=n("f2c8");for(var s in i)"default"!==s&&function(e){n.d(t,e,(function(){return i[e]}))}(s);n("5cda");var a,c=n("f0c5"),u=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);t["default"]=u.exports},dc75:function(e,t,n){"use strict";(function(e){n("f645");o(n("66fd"));var t=o(n("79a0"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},f2c8:function(e,t,n){"use strict";n.r(t);var o=n("009d"),i=n.n(o);for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);t["default"]=i.a},f765:function(e,t,n){"use strict";var o,i=function(){var e=this,t=e.$createElement;e._self._c},s=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return o}))}},[["dc75","common/runtime","common/vendor"]]]);
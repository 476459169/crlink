
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/home","pages/mine/mine","pages/record/record","pages/mine/login","pages/mine/regist","pages/mine/UserRegistrationAgreement","pages/home/videoDetail"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#7A7E83","selectedColor":"#ca5a30","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/home/home","iconPath":"static/home_g.png","selectedIconPath":"static/home_o.png","text":"首页"},{"pagePath":"pages/mine/mine","iconPath":"static/mine_g.png","selectedIconPath":"static/mine_o.png","text":"我的"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"crlink","compilerVersion":"2.6.16","entryPagePath":"pages/home/home","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","enablePullDownRefresh":true}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","navigationBarTitleText":"我的"}},{"path":"/pages/record/record","meta":{},"window":{"navigationBarTitleText":"学习记录"}},{"path":"/pages/mine/login","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/mine/regist","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/mine/UserRegistrationAgreement","meta":{},"window":{"navigationBarTitleText":"用户注册协议"}},{"path":"/pages/home/videoDetail","meta":{},"window":{"navigationBarTitleText":"课程详情","enablePullDownRefresh":true}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});

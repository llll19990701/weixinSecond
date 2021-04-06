// app.js
const apiConfig = require('./config');
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(res,"llllllllllllllllllllllllll")
    //   }
    // })
     // ---------------检测navbar高度
    let menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // console.log("小程序胶囊信息",menuButtonObject)
     wx.getSystemInfo({
       success: res => {
         let statusBarHeight = res.statusBarHeight,
           navTop = menuButtonInfo.top,//胶囊按钮与顶部的距离
           navHeight = statusBarHeight + menuButtonInfo.height + (menuButtonInfo.top - statusBarHeight)*2;//导航高度
         this.globalData.navHeight = navHeight;
         this.globalData.navTop = navTop;
         this.globalData.statusBarHeight=statusBarHeight;
         this.globalData.menuButtonInfo=menuButtonInfo;
         this.globalData.windowHeight = res.windowHeight;        
         console.log("navHeight",navHeight);
       },
       fail(err) {
         console.log(err);
       }
     })
   },
  
  globalData: {
    apiConfig:apiConfig,
    userInfo: null
  }
})

// pages/login/login.js
const app = getApp()
Page({
  data: {
      //判断小程序的API，回调，参数，组件等是否在当前版本可用。
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      isHide: false
  },
  onLoad: function() {
  },

  getUserInfos:function(e){
    let that=this
    console.log(e,"user")
    if(e.detail.errMsg=="getUserInfo:ok"){
      wx.showModal({
        title: '温馨提示',
        content: '正在请求您的个人信息',
        success(res) {
          if (res.confirm) {
            wx.getUserProfile({
            desc: "获取你的昵称、头像、地区及性别",
            success: res => {
              console.log(res,"ressss")
              wx.setStorageSync('nickName',res.userInfo.nickName )
              wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)  
              that.doLogin()
                         
            },
            fail: res => {
               //拒绝授权
               wx.showToast({
                title: '你拒绝了授权,无法登录',
                duration:2000,
                icon:'none'
              })             
            }
          })} else if (res.cancel) {
            //拒绝授权 showErrorModal是自定义的提示
           wx.showToast({
             title: '你拒绝了授权,无法登录',
             duration:2000,
             icon:'none'
           })
          }
        }
      })
      // wx.showLoading({
      //   title: '正在登录中',
      //   icon:'loading',
      //   mask:true
      // })
      // wx.hideLoading({
      //   success: (res) => {
      //      wx.reLaunch({
      //       url: '/pages/index/index',
      //     })
      //   },
      // })
     
    }
  },
  
  doLogin:function(){
    console.log(app.globalData.apiConfig.login_url,"url")
    wx.login({
      success:(mes)=>{
        console.log('code:',mes.code,)
        wx.request({
          url: app.globalData.apiConfig.login_url,
          data:{
            "code":mes.code,                 
          },
          header: {
             //'content-type': 'application/json'
            'content-type': 'application/x-www-form-urlencoded'
          },
          method:'POST',
          success(re){
            console.log("............................")
            wx.setStorageSync('userId', re.data.userid)
            wx.setStorageSync(("openid", re.data.openid))
           if(re.data.msg){
             //用户未注册 进行注册
             console.log(wx.getStorageSync('nickName'),)
             console.log(wx.getStorageSync('avatarUrl'))
             console.log(app.globalData.apiConfig.register_url,"url1")
             wx.request({           
               url: app.globalData.apiConfig.register_url,//为用户注册的接口
               data:{
                 "openId":wx.getStorageSync('userId'),
                 "nickName":wx.getStorageSync('nickName'),
                 "avatarUrl":wx.getStorageSync('avatarUrl'),
               },   
               header: {
                 //'content-type': 'application/json'
                'content-type': 'application/x-www-form-urlencoded'
              },
               method:'POST',
               success(ress){  
                 console.log(ress,"ress")
                 app.
                 wx.reLaunch({ //成功之后进入首页
                   url: '/pages/home/home',
                 })                
               }
             })
           }
           else{
             //已注册用户，直接获取全部信息
             wx.reLaunch({
              url: '/pages/home/home',
            })       
           }
          }
        })
      }
    })
  }
})

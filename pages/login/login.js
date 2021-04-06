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
    console.log(e,"user")
    if(e.detail.errMsg=="getUserInfo:ok"){
     // wx.setStorageSync('nikName', e.userInfo.nickName)
     // wx
     this.getOpenId();
    }
  },
  getOpenId:function(){
    wx.login({
      success:(res)=>{
        const code=res.code
        wx.getUserInfo({
          success:(mes)=>{
            console.log(mes,"mes")
          }
        })
        wx.request({
          url: 'url',//去调用获取openid的接口 
          data:{

          },        
        })
      }
    })
  }
  // },
  // getUserProflie:function(e){
  //   wx.getUserProfile({
  //    desc:'展示用户信息',
  //    success:(res)=>{
  //      console.log(res,"res")
  //     //  wx.showLoading({
  //     //   title: '正在登录中...',
  //     //   icon: 'loading',
  //     //   mask: true
  //     // })
  //        wx.login({
  //          success:re=>{         
  //            console.log(re,"login")
  //          }
  //        })
  //    },
  //    fail:(res)=>{
  //     console.log(res,"res1")
  //     console.log("你拒绝了请求")
  //    }
  //   })
  // }
  
})


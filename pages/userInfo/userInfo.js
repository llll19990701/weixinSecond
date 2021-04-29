// pages/userInfo/userInfo.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:app.globalData.apiConfig.uploadImag_url,
  },


   /**
   *获取用户信息
   */
  getUserInfos:function(){
  let uid=wx.getStorageSync('userId')
   wx.request({
     url:app.globalData.apiConfig.getUserInfo_url,
     data:{
       "pid":uid
     },
     method:'GET',
     header: {
      'content-type': 'application/json'
     //'content-type': 'application/x-www-form-urlencoded'
   },
    success:(res)=>{
      if(res.statusCode==200){
        this.setData({
          userInfo:res.data.data
        })
      }
    }

   })
  },

     /**
   *设置用户信息
   */
  setUserInfos:function(){
    let that=this
    let uid=wx.getStorageSync('userId')
   wx.request({
     url:app.globalData.apiConfig.setUserInfo_url,
     data:{
       "uid":uid,
       "nickname":""
     },
     method:'GET',
     header: {
      'content-type': 'application/json'
     //'content-type': 'application/x-www-form-urlencoded'
   },
    success:(res)=>{ console.log(res,"userinfo11111111111")
      if(res.statusCode==200){
        this.setData({
          userInfo:res.data.data
        })
      }
     
    }
   

   })
  },
 /**
   * 表单提交
   */
  formSubmit:function(e){
   let that=this
   let {nickname,phone}=e.detail.value
   if(!nickname||!phone){
    wx.showToast({
      title: '必填项不得为空',
      icon: 'none',
      duration: 1500
    })
    return;
   }
   let uid=wx.getStorageSync('userId')
   wx.request({
     url:app.globalData.apiConfig.setUserInfo_url,
     data:{
       'uid':uid,
       'nickname':nickname,
       'contact':phone
     },
     method:'POST',
     header: {
      //'content-type': 'application/json'
     'content-type': 'application/x-www-form-urlencoded'
   },
    success:(res)=>{ 
      console.log(res,"userinfo11111111111")
      if(res.statusCode==200){
        wx.showToast({
          title: '修改成功',
          icon:'success',
          duration: 1500
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../../pages/my/my',
          })
        }, 1500)
      }
    }
   })
  },
/**
   * 重置
   */
  formReset:function(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getUserInfos()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/comment/coment.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:["/images/fabu.png","/images/fenxiang.png","/images/home.png"],
    commentList:[],
    skip:1
  },
  toCommentDetail:function(e){
    console.log(e,"pppppppp")
    let CommentItems=JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/commentDetail/commentDetaile?CommentItems='+CommentItems
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    const userId=wx.getStorageSync('userId');
    if(!userId){
      wx.showToast({
        icon: 'none',
        title: '请先登陆',
        complete: res => {
          setTimeout(function() {
            wx.switchTab({
              url: '/pages/login/login',
            })
          }, 2000);
        }
      })
      return
    } 
    that.getPost('set')
  },
  
    /**
   * 获取帖子
   */  // type: add  set
  getPost(type){
    let that=this
    wx.showLoading({
      title: '加载中',
      icon:'loading'
    })
    let skip=that.data.skip
   if(type=='set'){
       skip=1
    }
    if(type=='add'){
      skip=skip+1
   }
     wx.request({
      url: app.globalData.apiConfig.getPost_url,
      data:{
        "pageNumber":skip
      },
      method:'GET',
      header: {
       // 'content-type': 'application/json'
       'content-type': 'application/x-www-form-urlencoded'
     },
     success:res=>{
       console.log(res,"res8888888888888888888aaaa")
       if(type=='add'){
         let old_data=that.data.commentList
         let new_data=res.data.data
         that.setData({
          commentList:old_data.concat(new_data),
          skip:skip
         })
       }else{
         that.setData({
          commentList:[].concat(res.data.data),
          skip:1
         })
       }
       wx.hideLoading()
       if (res.data.data.length != 0) {
         wx.showToast({
           title: '加载成功',
           icon: 'success'
         })
       } else {
         wx.showToast({
           title: '没有数据了',
           icon: 'none'
         })
       }
     }, fail: err => {
      wx.hideLoading()
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
      console.log('加载数据失败', err)
    }
  })     
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
     this.getPost('set')
     wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      this.getPost('add')
  },

 
})
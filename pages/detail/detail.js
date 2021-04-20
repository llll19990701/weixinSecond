// pages/detail/detail.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     isCollection:false,
     isCollectionText:"收藏",
     imageUrl:app.globalData.apiConfig.uploadImag_url,
     punlisher:""
    //  goodDetail:{id:0,title:"测试商品",image:["/images/lunbo/lunbotu2.png","/images/lunbo/lunbotu3.png"],publisher:"july",nowPrice:30,originPrice:60,create:"1617774573172",quality:'九成新',description:"具体请联系我"},        
  },
  changeCollection:function(){
    let text=''
    if(this.data.isCollectionText=='收藏'){
      text='已收藏'
    //   wx.request({
    //    url: 'url',//收藏表接口
    //  })
    }else{
      text='收藏'
         //   wx.request({
          //    url: 'url',//删除收藏表接口
          //  })
    }
     this.setData({
     isCollection:!this.data.isCollection,
     isCollectionText:text
     })
  },
  toHome:function(){
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options,"options222222222222222222")
  let item=JSON.parse(options.goodItems)
  console.log(item,"item''''''''''''''")
  let imgArr=item.goodsimg.split(",")
  wx.request({
    url:app.globalData.apiConfig.user_url,
    data:{
     "pid":item.pid,
    },
    method:'GET',
    header: {
      //'content-type': 'application/json'
     'content-type': 'application/x-www-form-urlencoded'
   },
    success:res=>{
      console.log(res,"user66666666666666666666")
      this.setData({
        publisher:res.data.data.nickname
      })
    }
  })

  this.setData({
    goodImg:[].concat(imgArr),
    goodDetail:item
  })
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
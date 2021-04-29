// pages/my/buy/buy.js
// pages/my/publish/publish.js
const APP=getApp()
Page({

  /**A
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:0,status:"审核中"},
      {id:5,status:"审核未通过"},     
      ],
      tabid:0,//当前点击的tab
      imageUrl:APP.globalData.apiConfig.uploadImag_url,
      userid:wx.getStorageSync('userId')
  },
    /**
   * 点击切换TAB
   */
  clickTab:function(e){
    this.setData({
      tabid:e.currentTarget.dataset.id
  })
    this.getCheck()
},
/*
 根据state筛选商品
*/
 checkGoods:function(state){

      let Goods=this.data.buyGoods
     let checkedGood= Goods.filter((item)=>{     
          return item.state==state      
      })
      this.setData({
        checkedGood:checkedGood
      })
 },
/**
   * 获取发布物品
   */
  getCheck:function(){
    let that=this
    let userid=wx.getStorageSync('userId')
       wx.request({
         url:  APP.globalData.apiConfig.getToBeReviewedByUid_url, //获取发布商品的接口
         data:{         
           "uid":userid,
           "state":this.data.tabid
         },
         method:'GET',
         header: {
          'content-type': 'application/json'
         //'content-type': 'application/x-www-form-urlencoded'
       },
         success:(res)=>{
           console.log(res.data.data,"111111111111111111111111111111111")
          that.setData({
            checkGood:res.data.data
          
            })    
              
       }
      })
  },
  /**
   * 去详情页
   */
  toDetail:function(e){
    console.log(e)
    let goodItems=JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      //navigateTo 是可以返回的页面跳转
      url: '/pages/detail/detail?goodItems=' + goodItems,     
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //加载状态
     this.getCheck()
  },

 /**
   * 删除发布
   */
 deletePublish:function(){
   
 },

  /**
   * 取消订单 就是去改变商品的satus 改为1
   */
  cancle:function(e){
      console.log(e,"cancel")
      let item=e.currentTarget.dataset.ord
     
      console.log(item.gid,"itemgid")
      wx.request({
        url:APP.globalData.apiConfig.delGoods_url,//取消订单
        data:{
          "gid":item.gid,
          "state":6
        },
        method:'GET',
        header: {
         'content-type': 'application/json'
        //'content-type': 'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        console.log(res,"................res")
        this.getCheck()
      }
      })
  },
  again:function(e){
      let item=e.currentTarget.dataset.ord
      wx.redirectTo({
        url: 'pages/publish/publish?item='+item
      })
  },
   /**
   * 确认出货 就是去改变商品的satus  该为2
   */
  confirm:function(){

  },
   /**
   * 重新发布 就是去改变商品的satus  该为0  然后修改发布时间
   */
  republish:function(){

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
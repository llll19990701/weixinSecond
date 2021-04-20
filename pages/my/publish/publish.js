// pages/my/publish/publish.js
Page({

  /**A
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:0,status:"待出售"},
      {id:1,status:"交易中"},
      {id:2,status:"已售出"},
      {id:3,status:"已下架"}
      ],
      publishList:[
        {id:1,imgSrc:"/images/category/jiaocai_1.png",time:1618803820858,title:"测试商品",price:15,status:0},
        {id:2,imgSrc:"/images/category/jiaocai_1.png",time:1618803820858,title:"测试商品",price:15,status:1}  ,
        {id:4,imgSrc:"/images/category/jiaocai_1.png",time:1618803820858,title:"测试商品",price:15,status:2},
        {id:3,imgSrc:"/images/category/jiaocai_1.png",time:1618803820858,title:"测试商品",price:15,status:3}
      ],//发布的商品列表
      tabid:0,//当前点击的tab
      status:3
  },
    /**
   * 点击切换TAB
   */
  clickTab:function(e){
    //console.log(e,"99999999999")
    this.setData({
      tabid:e.currentTarget.dataset.id
  })
   // his.getPublish()
},


/**
   * 获取发布物品
   */
  getPublish:function(){
    let that=this
   
       wx.request({
         url: 'url',//获取发布商品的接口
         data:{
           "status":that.data.tabid
         },
         method:'GET',
         header: {
          'content-type': 'application/json'
         //'content-type': 'application/x-www-form-urlencoded'
       },
         success:(res)=>{
           
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
    // this.getPublish()
  },

 /**
   * 删除发布
   */
 deletePublish:function(){
   
 },

  /**
   * 取消订单 就是去改变商品的satus 改为1
   */
  cancel:function(){

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
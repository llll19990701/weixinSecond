// pages/my/buy/buy.js
// pages/my/publish/publish.js
const APP=getApp()
Page({

  /**A
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:0,status:"交易中"},
      {id:1,status:"交易结束"},     
      ],
      publishList:[
        {id:1,imgSrc:"/images/category/jiaocai_1.png",time:1618803820858,title:"测试商品",price:15,status:0},
        {id:2,imgSrc:"/images/category/jiaocai_1.png",time:1618803820858,title:"测试商品",price:15,status:1}  ,
        {id:4,imgSrc:"/images/category/jiaocai_1.png",time:1618803820858,title:"测试商品",price:15,status:2},
        {id:3,imgSrc:"/images/category/jiaocai_1.png",time:1618803820858,title:"测试商品",price:15,status:3}
      ],//发布的商品列表
      tabid:0,//当前点击的tab
      status:3,
      imageUrl:APP.globalData.apiConfig.uploadImag_url,
      buyGoods:[]
  },
    /**
   * 点击切换TAB
   */
  clickTab:function(e){
    //console.log(e,"99999999999")
    this.setData({
      tabid:e.currentTarget.dataset.id
  })
  let state=this.data.tabid
    this.checkGoods(state)
   // his.getPublish()
},
/*
 根据state筛选商品
*/
 checkGoods:function(state){
      // if(state!==0&&state!==2)
      // return
      let Goods=this.data.buyGoods
     let checkedGood= Goods.filter((item)=>{
        if(state==1){
          return item.state==1||item.state==2
        }
        else{
          return item.state==state
        }
      })
      this.setData({
        checkedGood:checkedGood
      })
    
 },
/**
   * 获取购买物品
   */
  getPublish:function(){
    let that=this
    let userid=wx.getStorageSync('userId')
       wx.request({
         url:  APP.globalData.apiConfig.getBuy_url, //获取购买商品的接口
         data:{         
           "userId":userid
         },
         method:'GET',
         header: {
          'content-type': 'application/json'
         //'content-type': 'application/x-www-form-urlencoded'
       },
         success:(res)=>{
           console.log(res.data.data,"111111111111111111111111111111111")
          that.setData({
            buyGoods:res.data.data
            // status:Response.data.data.state
            })    
            that.checkGoods(that.data.tabid)           
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
     this.getPublish()
     //this.checkGoods(this.data.tabid)
  },

 /**
   * 删除发布
   */
  delete:function(){
  console.log(e,"del")
  let item=e.currentTarget.dataset.ord
  console.log(item.goods.gid,"itemgid")
  console.log(item.oid,"itemgid2")
  wx.request({
    url:APP.globalData.apiConfig.cancel_url,//取消订单
    data:{
      "gid":item.goods.gid,
      "oid":item.oid
    },
    method:'GET',
    header: {
     'content-type': 'application/json'
    //'content-type': 'application/x-www-form-urlencoded'
  },
  success:(res)=>{
    console.log(res,"................res")
    this.getPublish()
  }
  })
 },

  /**
   * 取消订单 就是去改变商品的satus 改为1
   */
  cancel:function(e){
      console.log(e,"cancel")
      let item=e.currentTarget.dataset.ord
      console.log(item.goods.gid,"itemgid")
      console.log(item.oid,"itemgid2")
      wx.request({
        url:APP.globalData.apiConfig.cancel_url,//取消订单
        data:{
          "gid":item.goods.gid,
          "oid":item.oid
        },
        method:'GET',
        header: {
         'content-type': 'application/json'
        //'content-type': 'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        console.log(res,"................res")
        this.getPublish()
      }
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
// pages/my/publish/publish.js
const app=getApp()
Page({

  /**A
   * 页面的初始数据
   */
  data: {
   
      publishList:[
        {id:1,imgSrc:"/images/category/jiaocai_1.png",time:1618803820858,title:"测试商品",price:15,status:0},
        {id:2,imgSrc:"/images/category/jiaocai_1.png",time:1618803820858,title:"测试商品",price:15,status:1}  ,
        {id:4,imgSrc:"/images/category/jiaocai_1.png",time:1618803820858,title:"测试商品",price:15,status:2},
        {id:3,imgSrc:"/images/category/jiaocai_1.png",time:1618803820858,title:"测试商品",price:15,status:3}
      ],//发布的商品列表
      tabid:0,//当前点击的tab
      status:3,
      collections:[],
      skip:1,
      imageUrl:app.globalData.apiConfig.uploadImag_url,
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
  getCollection:function(type){
    let that=this
    let userid=wx.getStorageSync('userId')
    let skip = this.data.skip
    if (type == 'set') {
      skip = 1
    }
       wx.request({
         url: app.globalData.apiConfig.myCollection_url,//获取收藏商品的接口
         data:{
          'uid':userid,
          'pageNumber':skip
         },
         method:'GET',
         header: {
          'content-type': 'application/json'
         //'content-type': 'application/x-www-form-urlencoded'
       },
         success:(res)=>{
           console.log(res,"..................")
           if(type!=='set'){
             let old_value=this.data.collections
             let new_value=res.data.data
             this.setData({
               collections:old_value.concat(new_value),
               skip:skip+10
             })
           }else{         
            this.setData({
              collections:res.data.data,
              skip:skip+10
            })
           }
         }
         
       })
  },
  /**
   * 去详情页
   */
  toDetail:function(e){
    console.log(e)
    let goodItems=JSON.stringify(e.currentTarget.dataset.item)
    console.log(goodItems,"gooditem........")
    if(e.currentTarget.dataset.item.state!==1){
      wx.showToast({
        title: '商品已下架,如若购买，可在我的购买中查看',
        icon:"none",
        duration:2000
        
      })
      return 
    }
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
     this.getCollection('set')
  },

 /**
   * 删除发布
   */
 deletePublish:function(){
   
 },

  /**
   * 取消收藏 就是去改变商品的satus 改为1
   */
  cancel:function(e){
      let item=e.currentTarget.dataset.ord
      let userid=wx.getStorageSync('userId')
      wx.request({
        url: app.globalData.apiConfig.cancelGoodsCollection_url2,
        data:{
          'gid':item.gid,
          'uid':userid 
        },
        method:'GET',
        header: {
          'content-type': 'application/json'
         //'content-type': 'application/x-www-form-urlencoded'
       },
         success:(res)=>{
        if(res.data){
          wx.showToast({
            title: '已删除',
          })
            this.getCollection("set")
        }
          
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
  onPullDownRefresh: function() {
    this.getCollection('set')
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getCollection('add')//实现分页
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
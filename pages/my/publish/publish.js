// pages/my/publish/publish.js
const app=getApp()
Page({

  /**A
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:0,status:"交易中" ,sid:2}, 
      {id:1,status:"待出售",sid:1},
      {id:2,status:"已售出",sid:3},
      {id:3,status:"已下架",sid:4},
      ],
      publishList:[],//发布的商品列表
      tabid:2,//当前点击的tab
      status:3,
      imageUrl:app.globalData.apiConfig.uploadImag_url,
  },
  
 /**
   * 点击切换TAB
   */
  clickTab:function(e){
    console.log(e,"99999999999")
    this.setData({
      tabid:e.currentTarget.dataset.id
  })
  let state=this.data.tabid
    this.checkGoods(state)
},
/*
 获取待确定的订单
*/
getConfirm:function(checkedGood){
  wx.request({
    url: app.globalData.apiConfig.getConfirm_url,
    data:{
      'uid':wx.getStorageSync('userId')
    },
    method:'GET',
    header: {
     'content-type': 'application/json'
    //'content-type': 'application/x-www-form-urlencoded'
  },
    success:(res)=>{
          console.log(res,"lllllllllllllll..............")
          checkedGood=checkedGood.concat(res.data.data)
          console.log(checkedGood,"checkedGood..............")
          this.setData({
           checkedGood:checkedGood
         })        
    }
  })
},
/*
 根据state筛选商品
*/
checkGoods:function(state){
   let checkedGood=[]
  if(state==2){
    //请求订单中的信息，交易中的由于取消订单要oId 所以直接从订单表拿信息
    wx.request({
      url: app.globalData.apiConfig.getConfirm_url,
      data:{
        'uid':wx.getStorageSync('userId')
      },
      method:'GET',
      header: {
       'content-type': 'application/json'
      //'content-type': 'application/x-www-form-urlencoded'
    },
      success:(res)=>{
            console.log(res,"lllllllllllllll..............")
            checkedGood=checkedGood.concat(res.data.data)
            console.log(checkedGood,"checkedGood..............")
            this.setData({
             checkedGood:checkedGood
           })        
      }
    })
  }else{
  let Goods=this.data.publishGoods
  checkedGood= Goods.filter((item)=>{
      return item.state==state
  })
  this.setData({
    checkedGood:checkedGood
  })
  }
  console.log(checkedGood,"checkedGood2..............")

},
/*

/**
   * 获取发布物品
   */
  getPublish:function(){
    let that=this
     let userid=wx.getStorageSync('userId')
       wx.request({
         url: app.globalData.apiConfig.fabuHistory_url,//获取发布商品的接口
         data:{
           "uid":userid
         },
         method:'GET',
         header: {
          'content-type': 'application/json'
         //'content-type': 'application/x-www-form-urlencoded'
       },
         success:(res)=>{
           console.log(res,"resccccccccccccccccccc")
           that.setData({
            publishGoods:res.data.data
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
  },

 /**
   * SC发布 针对出售中的商品  从商品表中做删除
   */
  delete:function(e){
  console.log(e,"delete")
  let item=e.currentTarget.dataset.ord
  console.log(item.gid,"itemgid")
 // console.log(item.oid,"itemgid2")
  wx.request({
    url:app.globalData.apiConfig.delPublish_url,//取消订单
    data:{
      "state":6,
      "gid":item.gid
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
      url:app.globalData.apiConfig.cancel_url,//取消订单
      data:{
        "oid":item.oid,
        "gid":item.goods.gid
      },
      method:'GET',
      header: {
       'content-type': 'application/json'
      //'content-type': 'application/x-www-form-urlencoded'
    },
    success:(res)=>{
      console.log(res,"................res")
      this.checkGoods(2)
    }
    })
},
   /**
   * 确认出货 就是去改变商品的satus  该为2
   */
  confirm:function(e){
    let item=e.currentTarget.dataset.ord
    console.log(item,"item........................")
    let userId=wx.getStorageSync('userId')
    wx.request({
      url:app.globalData.apiConfig.confirm_url,//取消订单
      data:{
        "oid":item.oid,
        "gid":item.goods.gid
      },
      method:'GET',
      header: {
       'content-type': 'application/json'
      //'content-type': 'application/x-www-form-urlencoded'
    },
    success:(res)=>{
      console.log(res,"................res")
      this.checkGoods(2)
    }
    })
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
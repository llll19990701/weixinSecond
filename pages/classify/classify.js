// pages/classify/classify.js
const APP=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Categories:[
      "全部"
    ],
    goodslist:[],
    activeCategory:0,//与Categories索引一致
    skip:1
  },

  categoryChange:function(e){
    //console.log(e,"00000000000000000000000000000")
    this.setData({
      activeCategory:e.target.dataset.idx
    })
    this.getGoods("set")
  },
  getCategoryId:function(){
    if(APP.globalData.currentcID) {
          this.setData({activeCategory:APP.globalData.currentcID})
          APP.globalData.currentcID=null
        }else{
          this.setData({activeCategory:0})
        }            
  },
  /**,
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
  that.getCategoryId()
  console.log(this.data.activeCategory,"...................")
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
    let category=wx.getStorageSync('category')

     if(category){  
       category.forEach((item,index)=>{
        this.setData({Categories:this.data.Categories.concat(item.categoryname)})
       })       
     }
      console.log(this.data.Categories,"cate")
     this.getGoods("set")
  },
  
  goSearch:function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  toDetail:function(e){
    console.log(e)
    let goodItems=JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      //navigateTo 是可以返回的页面跳转
      url: '/pages/detail/detail?goodItems=' + goodItems,     
    })
  },

   /**
   * 取得商品
   */
   //获取商品列表
  // type: add  set
  getGoods: function(type) {
    wx.showLoading({
      title: '加载中',
    })
    let that=this
    let skip = this.data.skip
    if (type == 'set') {
      skip = 1
    }
    if (type == 'add') {
      skip = skip+1
    }
    wx.request({
      url: APP.globalData.apiConfig.classify_url,
      data:{   
         "category":that.data.activeCategory,
         "pageNumber":skip,      
      },
      method:'GET',
      header: {
        //'content-type': 'application/json'
       'content-type': 'application/x-www-form-urlencoded'
     },
      success:res=>{
        console.log(res,"resss88888888888888888888888")
        if(type=='add'){//如果是重新请求，就重新赋值goodList
          let old_data = this.data.goodslist
          let new_data = res.data.data
          this.setData({
            goodslist: old_data.concat(new_data),
            skip: skip
          })
        }else {
          this.setData({
            goodslist: [].concat(res.data.data),            
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
        console.log("加载数据成功", res)
      },
      fail: err => {
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     if(APP.globalData.currentcID) {
        this.setData({activeCategory:APP.globalData.currentcID})
        APP.globalData.currentcID=null
      }else{
        this.setData({activeCategory:0})
      }            
      this.getGoods("set")
    console.log(this.data.activeCategory,"...................")
  },

 
 

   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getGoods('set')
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getGoods('add')//实现分页
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
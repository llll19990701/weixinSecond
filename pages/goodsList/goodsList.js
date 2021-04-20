// pages/goodsList/goodsList.js
const app=getApp()
const image=require("../../common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:app.globalData.apiConfig.uploadImag_url,
    option1: [{
        text: '全部商品',
        value: 0
      }],
    option2: [{
        text: '默认排序',
        value: 'updatetime'
      },
      {
        text: '价格最低',
        value: 'price'
      },
    ],
    value1: 0,
    value2: 'updatetime',
    goodslist: [],
    searchVal: '',
    skip: 0
  },

  onChange: function(e) {
    console.log(e)
    if (e.currentTarget.dataset.type == "op1") {
      this.setData({
        value1: Number(e.detail)
      })
    } else {
      this.setData({
        value2: e.detail
      })
    }
    this.getGoodsList('set')
  },
  // 跳转到详情页
  goInfo: function(e) {
    
    let goodItems=JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      //navigateTo 是可以返回的页面跳转
      url: '/pages/detail/detail?goodItems=' + goodItems,     
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let category=wx.getStorageSync('category')
    if(category){  
      category.forEach((item,index)=>{
        let object={
          text:item.categoryname,
          value:index+1
        }
       that.setData({option1:that.data.option1.concat(object)
      })
      //console.log(that.data.option1)
      })       
    }
     console.log(that.data.option1,"cate") 
      wx.showNavigationBarLoading()
    if (options.searchVal != undefined) {
      this.setData({
        searchVal: options.searchVal
      })
    }
    // if (options.category != undefined) {
    //   this.setData({
    //     value1: Number(options.category) + 1
    //   })
    // }
    this.getGoodsList('set')
  },

  //获取商品列表
  // type: add  set
  getGoodsList: function(type = 'set') {
    wx.showLoading({
      title: '加载中',
    })
    let data = {}
    if (this.data.value1) {
      data.category = Number(this.data.value1)
    }
    if (this.data.searchVal != '') {
      data.title = this.data.searchVal
    }
    let skip = this.data.skip
    if (type == 'set') {
      skip = 0
    }
    data.skip = skip
    data.orderby = this.data.value2//排序方式
    wx.request({
      url: app.globalData.apiConfig.search_url,
      data:{
        "key":data.title,
        // "category":data.category,
         "pageNumber":data.skip,
        "orderBy":data.orderby
      },
      method:'GET',
      header: {
        //'content-type': 'application/json'
       'content-type': 'application/x-www-form-urlencoded'
     },
      success:res=>{
        console.log(res,"resss88888888888888888888888")
        if(type!=='set'){//如果是重新请求，就重新赋值goodList
          let old_data = this.data.goodslist
          let new_data = res.data.data
          this.setData({
            goodslist: old_data.concat(new_data),
            skip: skip + res.data.data.length
          })
        }else {
          this.setData({
            goodslist: res.data.data,
            
            skip: skip + res.data.data.length
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

  //搜索框获取焦点
  onFocus: function() {
    if (this.prevent) {
      return
    }
    this.prevent = true
    setTimeout(() => {
      this.prevent = false
    }, 1000)
    wx.navigateTo({
      url: '../search/search',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideNavigationBarLoading()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getGoodsList('set')
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getGoodsList('add')//实现分页
  }
})
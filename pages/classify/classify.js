// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Categories:[
      {id:1,categoryName:"书籍教材",categoryUrl:"/images/category/jiaocai_1.png"},
      {id:2,categoryName:"电子教育",categoryUrl:"/images/category/dianzichanpin_1.png"},
      {id:3,categoryName:"服装配饰",categoryUrl:"/images/category/wode-.png"},
      {id:4,categoryName:"寝居必备",categoryUrl:"/images/category/shenghuoyongpin-copy.png"},
      {id:5,categoryName:"文化体育",categoryUrl:"/images/category/tiyu.png"},
      {id:6,categoryName:"其他",categoryUrl:"/images/category/qita.png"},
      {id:7,categoryName:"文化体育",categoryUrl:"/images/category/tiyu.png"},
      {id:8,categoryName:"其他",categoryUrl:"/images/category/qita.png"},
      {id:9,categoryName:"文化体育",categoryUrl:"/images/category/tiyu.png"},
      {id:10,categoryName:"其他",categoryUrl:"/images/category/qita.png"},
    ],
    //let time=new Date().getTime()
    // goodList:[
    //   {id:0,title:"测试商品",image:"/images/collect_active.png",publisher:"july",nowPrice:30,create:time}
    // ],
    
    activeCategory:0//与Categories索引一致
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let time=new Date().getTime()
     this.setData({
      goodList:[
        {id:0,title:"测试商品",image:"/images/collect_active.png",publisher:"july",nowPrice:30,create:time},
        {id:1,title:"测试商品",image:"/images/category/jiaocai_1.png",publisher:"july",nowPrice:30,create:time},
        {id:2,title:"测试商品",image:"/images/news_active.png",publisher:"july",nowPrice:30,create:time}
      ]
     })

   //页面加载时可以通过缓存进行分类标亮定位
    const currentCateId=wx.getStorage({
      key: 'cureenCateId',
    })
    wx.removeStorage({
      key: 'cureenCateId',
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
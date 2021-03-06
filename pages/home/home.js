// pages/home/home.js

const APP = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:[
      "/images/lunbo/lunbotu2.png",
      "/images/lunbo/lunbotu3.png",
      "/images/lunbo/lunbotu6.jpg",
      "/images/lunbo/lunbotu7.jpg"
    ],
   imageUrlAll:APP.globalData.apiConfig.categoryImage_url,
   bannerImageUrl:APP.globalData.apiConfig.bannerImage_url,
   swiperData:[],//轮播图
   category:[
    //  {id:1,categoryName:"书籍教材",categoryUrl:"/images/category/jiaocai_1.png"},
    //  {id:2,categoryName:"电子教育",categoryUrl:"/images/category/dianzichanpin_1.png"},
    //  {id:3,categoryName:"服装配饰",categoryUrl:"/images/category/wode-.png"},
    //  {id:4,categoryName:"寝居必备",categoryUrl:"/images/category/shenghuoyongpin-copy.png"},
    //  {id:5,categoryName:"文化体育",categoryUrl:"/images/category/tiyu.png"},
    //  {id:6,categoryName:"其他",categoryUrl:"/images/category/qita.png"},
    //  {id:7,categoryName:"文化体育",categoryUrl:"/images/category/tiyu.png"},
    //  {id:8,categoryName:"其他",categoryUrl:"/images/category/qita.png"},
    //  {id:9,categoryName:"文化体育",categoryUrl:"/images/category/tiyu.png"},
    //  {id:10,categoryName:"其他",categoryUrl:"/images/category/qita.png"},
   ],
   noticeList:[
     {id:1,title:"最新发布消息此处可看，系统公告1"},
     {id:2,title:"最新发布消息此处可看，系统公告2"}
   ],
   recommenedList:[
    //  {id:1,imageUrl:"/images/pic1.png",title:'推荐测试',originPrice:30,nowPrice:15},
    //  {id:2,imageUrl:"/images/pic1.png",title:'推荐测试',originPrice:30,nowPrice:15},
    //  {id:3,imageUrl:"/images/pic1.png",title:'推荐测试',originPrice:30,nowPrice:15},
    //  {id:4,imageUrl:"/images/pic1.png",title:'推荐测试',originPrice:30,nowPrice:15},
   ],
   isPullDownRefresh:false,
   currentPage:1,

   scrollTop:0

  },

    /**
   * 点击查看公告详情
   */
  toNoticeDetail:function(e){
    let item=JSON.stringify(e.currentTarget.dataset.notice)
    wx.navigateTo({
      url: "/pages/latestNotice/latestNotice?notice="+item,
    })
  },
    /**
   * 获取最新公告
   */
  getLastNotice:function(){
     wx.request({
       url: APP.globalData.apiConfig.notice_url,
      method:'GET',
      header: {
        'content-type': 'application/json'
       //'content-type': 'application/x-www-form-urlencoded'
     },
      success:(res)=>{
        console.log(res,"notice...............")
        this.setData({
          notice:[].concat(res.data.data),
          convetNotice:this.getSimpleText(res.data.data.noticecontent)
        })
      }
     })
  },
   /**
   * 从富文本中提取纯文字
   */
   getSimpleText:function(html){
    var re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
    var msg = html.replace(re1,'');//执行替换成空字符
    return msg;
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const userId=wx.getStorageSync('userId');
    this.bannerList()
    if(userId){
      if(!this.data.isPullDownRefresh){
          // wx.showLoading({
          //         title: '正在加载中...',
          //         icon:'loading',
          //         mask:true
          //       })
                this.bannerList();
                this.categoryList();
                this.getRecommendGoodList();
                this.getLastNotice();
      }             
    }else{
      wx.showToast({
        title: '请先登录',
        duration:2000
      })
      wx.reLaunch({
        url: '/pages/login/login',
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){
    console.log("App.globalData.navHeight", APP.globalData.navHeight)
    console.log("App.globalData.navTop", APP.globalData.navTop)
    console.log("App.globalData.windowHeight", APP.globalData.windowHeight)
    let navHeight=APP.globalData.navHeight
    let navTop=APP.globalData.navTop
    let statusBarHeight=APP.globalData.statusBarHeight
    console.log(statusBarHeight,"statusBarHeight")
    let  menuButtonInfo=APP.globalData.menuButtonInfo
    console.log(menuButtonInfo,"....")
    let margin=navTop-statusBarHeight
 
    // let categoryGroupLenth=this.data.category.length
    // let categoryLunHeight= categoryGroupLenth>4? 2*70:60//动态计算种类轮播高度

    this.setData({
      navHeight:navHeight,
      searchTop:navTop,
      searchHeight:menuButtonInfo.height,
      margin:margin,
      searchWidth:menuButtonInfo.right-menuButtonInfo.width,
      searchRight:menuButtonInfo.right,
    //  categoryLunHeight:categoryLunHeight,
      windowHeight: APP.globalData.windowHeight,   
    })

  
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
   * 搜索
   */
  goSearch:function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
    /**
   * 获取推荐列表
   */
  getRecommendGoodList(){
    wx.request({
      url: APP.globalData.apiConfig.recommendGoods_url,
      method:'GET',
      header: {
        'content-type': 'application/json'
       //'content-type': 'application/x-www-form-urlencoded'
     },
      success:(res)=>{
        console.log(res,"666666666666666666666")
        this.setData({recommenedList:this.data.recommenedList.concat(res.data.data)})
      }
      
    })
  },
    /**
   * 获取轮播图片
   */
  bannerList(){
    //console.log(APP.globalData.apiConfig.banner_url,"url111111111111111")
    wx.request({
      url: APP.globalData.apiConfig.banner_url,
      method:'GET', 
      header: {
        'content-type': 'application/json'
       //'content-type': 'application/x-www-form-urlencoded'
     },
      success:(res)=>{ 
        console.log(res,"5555555555555555")
        if(res.statusCode===200){
          if(!this.data.isPullDownRefresh){
            wx.hideLoading();
            wx.hideNavigationBarLoading() //完成停止加载
          }
          else{
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading() //完成停止加载
            this.setData({
              isPullDownRefresh:'false'
            })
          }
        }
        this.setData({     
          bannerImage:[].concat(res.data.data)
        })      
       // console.log(this.data.bannerImage,"bannerImage")
      }
  })
},
  categoryList(){
    console.log(APP.globalData.apiConfig.category_url,"url")
    let that=this
    wx.request({
      url: APP.globalData.apiConfig.category_url,
      method:'GET', 
      header: {
        'content-type': 'application/json'
       //'content-type': 'application/x-www-form-urlencoded'
     },
      success:(res)=>{
        console.log(res,"res")
        if(res.statusCode===200){
          if(!this.data.isPullDownRefresh){
            wx.hideLoading();
          }
          else{
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
            this.setData({
              isPullDownRefresh:'false'
            })
          }
        }
        that.setData({
          category:[].concat(res.data.data),          
        })        
        wx.setStorageSync('category', that.data.category)
        console.log(wx.getStorageSync('category'),"111111111111111")
        this.categoryLunBo(this.data.category)//轮播分组
        if(this.data.categoryGroups.length>1){
          this.setData({
            autoPlay:true,
            indicatorDots:true,
          })
        }
        let categoryGroupLenth=this.data.category.length
        let categoryLunHeight= categoryGroupLenth>4? 2*70:60//动态计算种类轮播高度
        that.setData({
          categoryGroupLenth:categoryGroupLenth,
          categoryLunHeight:categoryLunHeight
        })
        console.log(that.data.category,"csaaddddddddddd")
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {
    let that=this
    this.setData({
     currentPage:1,
    isPullDownRefresh:'true',
    })
    //获取商品
    //获取轮播
    //获取类别
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 用户点击右上角分享
   */
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  categoryLunBo:function(category){
      if(category.length<=0){
        return 
      }
      let categories=[].concat(category)
      let categoryGroup=[];
      let isbool=true
      while(categories.length>0){
        if(categories.length>=8){
           categoryGroup.push(categories.splice(0,8))
        }
        else{
          categoryGroup.push(categories.splice(0,categories.length))
          break;
        }
      }
      this.setData({
        categoryGroups:categoryGroup,
      })
        console.log(categoryGroup)
      },
  categoryCLick:function(e){
    //const categoryId=e.currentTarget.dataset.id//获取到目标类别id
    const category=this.data.category.find(ele=>{
      return ele.id=e.currentTarget.dataset.id
    })  
   // wx.setStorageSync('currentID', e.currentTarget.dataset.id-1)
   APP.globalData.currentcID=e.currentTarget.dataset.id+1
    wx.switchTab({
      url: '/pages/classify/classify'
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
   toQiuGou:function(){
     wx.navigateTo({
       url: '/pages/comment/coment',
     })
   }

})
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
   swiperData:[],//轮播图
   category:[
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
   noticeList:[
     {id:1,title:"最新发布消息此处可看，系统公告1"},
    //  {id:2,title:"最新发布消息此处可看，系统公告2"}
   ],
   recommenedList:[
     {id:1,imageUrl:"/images/pic1.png",title:'推荐测试',originPrice:30,nowPrice:15},
     {id:2,imageUrl:"/images/pic1.png",title:'推荐测试',originPrice:30,nowPrice:15},
     {id:3,imageUrl:"/images/pic1.png",title:'推荐测试',originPrice:30,nowPrice:15},
     {id:4,imageUrl:"/images/pic1.png",title:'推荐测试',originPrice:30,nowPrice:15},
   ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.categoryLunBo(this.data.category)//轮播分组
    if(this.data.categoryGroups.length>1){
      this.setData({
        autoPlay:true,
        indicatorDots:true,
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

    let categoryGroupLenth=this.data.category.length
    let categoryLunHeight= categoryGroupLenth>4? 2*70:60//动态计算种类轮播高度

    this.setData({
      navHeight:navHeight,
      searchTop:navTop,
      searchHeight:menuButtonInfo.height,
      margin:margin,
      searchWidth:menuButtonInfo.right-menuButtonInfo.width,
      searchRight:menuButtonInfo.right,
      categoryLunHeight:categoryLunHeight,
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
    wx.setStorage({
      data: category.id,
      key: 'cureenCateId',
    })
    wx.switchTab({
      url: '/pages/classify/classify',
    })
  }
})
const app = getApp();
Component({
  //数据
  data: {
    selected: 0,//当前tabBar页面
    color: "#cdcdcd",//未选中tabBar时的文字颜色
    selectedColor: "#22385d",//选中时tabBar文字颜色
    //addImgPath:'/pages/resource/image/tab-bar-image/add.png',
    // tabBar对象集合
    list:  [{
      pagePath: "/pages/home/home",
      text:"首页" ,
      iconPath: "/images/home.png",
      selectedIconPath: "/images/home_active.png"
    },
    {
      pagePath: "/pages/my/my",
      text: "我的",
      iconPath: "/images/add.png",
      selectedIconPath: "/images/add.png"
    },
    {
      pagePath: "/pages/my/my",
      text: "我的",
      iconPath: "/images/me.png",
      selectedIconPath: "/images/me_active.png"
    }]
  },
  methods: {
    // tabBar切换事件
    tab_bar_index(e) {
      console.log(e)
      const index=e.currentTarget.dataset.index
      
      const url = e.currentTarget.dataset.path
     
      wx.switchTab({url})
      this.setData({
        selected:index
      })
    },

   
  }
})
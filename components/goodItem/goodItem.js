// components/goodItem/goodItem.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommenedItem:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl:app.globalData.apiConfig.uploadImag_url
  },
  /**
   * 组件的方法列表
   */
  methods: {

  },
  attached: function () { 
     console.log(this.properties.recommenedItem,"recommenedItem")
     let imgArr= this.properties.recommenedItem.goodsimg.split(",")
     this.setData({imgUrl:imgArr[0]})
  },
})

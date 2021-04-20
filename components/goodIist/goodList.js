const { user_url } = require("../../config")

// components/goodIist/goodList.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    GoodList:Object
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

})

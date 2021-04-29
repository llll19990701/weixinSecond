// components/comment/comment.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isdetail:Boolean,
    CommentList:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    //image:["/images/fabu.png","/images/fenxiang.png","/images/home.png"],
    imageUrl:app.globalData.apiConfig.uploadImag_url,
    imgArr:[]
  },
  attached: function () { 
    console.log(this.properties.CommentList,"CommentList")
    if(this.properties.CommentList.postimg){
        let imgArr= this.properties.CommentList.postimg.split(",")
       this.setData({image:[].concat(imgArr)})
    }
  
 },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

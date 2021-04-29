// pages/commentDetail/commentDetaile.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   * status 0 表示对帖子回复  1表示对评论
   */
  data: {
    isreplayTo:false,
    focus:false,
    placeHolder:'',
    commentVal:'',
    skip:1,
    comments:[],
    isdetail:true,
    status:0,
    CommentItems:{}
  },
  bindfocus:function(e){
    console.log(e,'1111111111111')
    this.setData({
      focus:true
    })

  },
  bindblur:function(){
    let item=this.data.CommentItems
    this.setData({
      focus:false,
      placeHolder:'',
      reviewedUserId:item.user.uid,
      reviewedUserNikname:item.user.nickname,
      viewObject:0
    })
  },

  handleTouchStart: function(e) {    
    this.setData({
      startTime:e.timeStamp

    })  
    //console.log(" startTime = " + e.timeStamp);  
},  
 
//touch end
handleTouchEnd: function(e) { 
  console.log(e,"eeeeeeeeeeee")   
    this.setData({
      endTime:e.timeStamp
    }) 
    if(this.data.endTime-this.data.startTime>=600){
      let name=e.currentTarget.dataset.user.nickname//拿到回复的user
      this.setData({
        focus:true,
        placeHolder:`回复${name}`
      })
    }
    let user=e.currentTarget.dataset.user
    this.setData({
      reviewedUserId:user.uid,
      reviewedUserNikname:user.nickname,
      viewObject:1
    })
},  
bindinput:function(e){
    this.setData({
      commentVal:e.detail.value
    })
},
send:function(e){
  console.log(this.data.commentVal,"commentVal")//获取到输入框的值
  let content=this.data.commentVal
  let uid=this.data.reviewedUserId
  let objectname=this.data.reviewedUserNikname
  let postid=this.data.CommentItems.postid
  let viewObject=this.data.viewObject
  let userid=wx.getStorageSync('userId')
  console.log(uid,"uid..................")
  console.log(objectname,"objectname..........")
  console.log(postid,"postid..................")
  console.log(viewObject,"viewObject..........")
  console.log(userid,"userid..........")
  wx.request({
    url: app.globalData.apiConfig.postComment_url,
    data:{
       "reviewContent":content,
       "uid":uid,
       "postid":postid,
       "nickname":objectname,
       "viewObject":viewObject,
       "userId":userid
    },
    method:"POST",
    header: {
      // 'content-type': 'application/json'
      'content-type': 'application/x-www-form-urlencoded'
    },
    success:(res)=>{
      console.log("发布成功")
      this.setData({
        commentVal:''
      })
       this.getComments()
    }
  })
 
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options.CommentItems,"option111111111111111")
    let CommentItems=JSON.parse(options.CommentItems)
    
    console.log(CommentItems,"optionwwwwwwwwwwwwwwwwwww")
    this.setData({
      CommentItems:CommentItems,
      postid:CommentItems.postid,
      reviewedUserId:CommentItems.user.uid,
      reviewedUserNikname:CommentItems.user.nickname,
      viewObject:0
    })

    this.getComments()
    

  },

  getComments:function(){
    wx.request({
      url: app.globalData.apiConfig.getComment_url,
      data:{
       "postid":this.data.postid,
      //  "pageNumber":this.data.skip
      },
      method:"GET",
      header: {
        // 'content-type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:(res)=>{
         console.log(res,"res66666666666666666666666666")
         let commentItem=this.data.CommentItems
         commentItem.num=res.data.data.length
         this.setData({
          comments:[].concat(res.data.data),    
          CommentItems:commentItem
         })
      }
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
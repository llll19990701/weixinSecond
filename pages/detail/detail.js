// pages/detail/detail.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     isCollection:false,
     isCollectionText:"收藏",
     imageUrl:app.globalData.apiConfig.uploadImag_url,
     punlisher:""
    //  goodDetail:{id:0,title:"测试商品",image:["/images/lunbo/lunbotu2.png","/images/lunbo/lunbotu3.png"],publisher:"july",nowPrice:30,originPrice:60,create:"1617774573172",quality:'九成新',description:"具体请联系我"},        
  },

  checkedCollection:function(){
     let gid=this.data.gdItem.gid
    let userid=wx.getStorageSync('userId')
    wx.request({
      url: app.globalData.apiConfig.isCollection_url,
      data:{
        'uid':userid,
        'gid':gid
      },
      method:'GET',
      success:(res)=>{
        console.log(res,"res;;;;;;;;;;;;;;;;;")
        if(res.data.code==1){      
          if(res.data.msg=='YES')  
          this.setData({
            cid:res.data.data.cid,
            isCollection:true,
            isCollectionText:'已收藏'
          })
        }
      }
    })
  },
  changeCollection:function(e){
    let gid=e.currentTarget.dataset.id
    let userid=wx.getStorageSync('userId')
    let text=''
    if(this.data.isCollectionText=='收藏'){ 
      text='已收藏'
      wx.request({
       url: app.globalData.apiConfig.docollection_url,//收藏表接口
       data:{
       'uid':userid,
       'gid':gid
       },
       header: {
        //'content-type': 'application/json'
      'content-type': 'application/x-www-form-urlencoded'
      },
       method:'POST',
      header: {
        //'content-type': 'application/json'
      'content-type': 'application/x-www-form-urlencoded'
      },
      success:(res)=>{
         console.log(res,"000000000")
         if(res.data.code==1){
        
            this.setData({
              cid:res.data.data.cid            
            })
         }
      }
       
     })
    }else{
         text='收藏'
           wx.request({
             url: app.globalData.apiConfig.cancelGoodsCollection_url,//删除收藏表接口
             data:{
               'cid':this.data.cid
             },
             method:"POST",
             header: {
              //'content-type': 'application/json'
            'content-type': 'application/x-www-form-urlencoded'
            },
            success:(res)=>{
              console.log(res)
            }
           })
    }
     this.setData({
     isCollection:!this.data.isCollection,
     isCollectionText:text
     })
  },
  toHome:function(){
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options,"options222222222222222222")
  let item=JSON.parse(options.goodItems)
  console.log()
  this.setData({
    gdItem:item
  })
  console.log(item,"item''''''''''''''")
  let imgArr=item.goodsimg.split(",")
  wx.request({
    url:app.globalData.apiConfig.user_url,
    data:{
     "pid":item.pid,
    },
    method:'GET',
    header: {
      //'content-type': 'application/json'
     'content-type': 'application/x-www-form-urlencoded'
   },
    success:res=>{
      console.log(res,"user66666666666666666666")
      this.setData({
        publisher:res.data.data.nickname,
        phone:res.data.data.contact,

      })
    }
  })
  this.checkedCollection()//检查是否收藏
    
  this.setData({
    goodImg:[].concat(imgArr),
    goodDetail:item
  })
  
  },
  /*
  立即购买弹出一个假的的支付界面//或者进入界面
  */
   buy:function(e){
     let userid=wx.getStorageSync('userId')
     console.log(this.data.gdItem,"eeeeeeeeeeeeee")
      wx.request({
        url: app.globalData.apiConfig.buy_url,
        data:{
          "userId":userid,
          "gid":this.data.gdItem.gid,
          "payAmount":this.data.gdItem.goodsprice
        }, 
        header: {
          //'content-type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      method:'POST',
      success:(res)=>{
        if(res.statusCode==200){
          wx.showToast({
            title: '购买成功',
            icon:'success',
            duration:2000
          })
          setTimeout(function(){
            wx.reLaunch({
              url: '/pages/home/home',
            })

          },1000)
        }
         
      }
      })
   },
 //复制
      copy:function(e) {
            wx.setClipboardData({
                  data: e.currentTarget.dataset.phone,
                  success: res => {
                        wx.showToast({
                              title: '已复制联系人方式',
                              icon: 'success',
                              duration: 1000,
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
// pages/feedBack/feedBack.js
var COS = require('../../utils/lib/cos-wx-sdk-v5');
var cos = new COS({
  SecretId: 'AKID94tMjtOEA1YtW1KlrWzDFCakrjpmlxOa',
  SecretKey: 'yjGZfYJEvNKwJTWTEGRRIzSl22e9Sj1F',
});
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    t_length:0,
    img_length:0,
    imgUrls:app.globalData.apiConfig.uploadImag_url,
    fileList:[],
    uploadImg:[],
  },

  onInput:function(e){
    console.log(e,"onInput")
    var t_text = e.detail.length;
    // console.log(t_text)
    this.setData({
      t_length: t_text
    }) 
  },
  formSubmit: function(e) {
    let that=this
    const userId=wx.getStorageSync('userId');
    if(!userId){
        wx.showToast({
                    icon: 'none',
                    title: '请先登陆',
                    complete: res => {
                      setTimeout(function() {
                        wx.switchTab({
                          url: '/pages/login/login',
                        })
                      }, 2000);
                    }
                  })
                  return 
        }
      console.log('form发生了submit事件，携带数据为：', e);
      if (e.detail.value.desc) {
        if (this.data.fileList.length == 0) {
          wx.showToast({
            icon: 'none',
            title: '未上传图片'
          })
          return
        }
        wx.showLoading({
          title: '正在发布',
        });
        console.log(that.data.uploadImg.toString(),"file555555555555555555555555")
        wx.request({
          url: app.globalData.apiConfig.feedback_url,
          data:{
            "userId":userId,
            "msg":e.detail.value.desc,
            "feedImg":that.data.uploadImg.toString()
          },
          header: {
           // 'content-type': 'application/json'
           'content-type': 'application/x-www-form-urlencoded'
         },
         method:'POST',
         success:(res)=>{
          console.log(res,"publishR")
          if(res.statusCode==200){
            wx.hideLoading()
            wx.showToast({
              title: "发布成功",
              icon:"success"
            })
           wx.switchTab({
             url: '/pages/my/my',
           })   
          }
          else{
           // this.deleteImage()
           wx.hideLoading()
           wx.showToast({
             title: "发布失败，请重新发布",
             icon:"error"
           })
          }
         }     
         })
    
      } else {
        wx.showToast({
          icon: 'none',
          title: '请填写完整信息'
        })
      }
  },
    //预览图片
    previewImg: function(event) {
      let src = event.currentTarget.dataset.url; //获取data-src
      let imgList = []; //获取data-list
      const {
        fileList = []
      } = this.data
      fileList.forEach((item, index, fileList) => {
        imgList.push(item);
      })
      //图片预览
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表
      })
    },
 /**e
   * 上传图片至服务器
   */
  uploadImgFile: function(e) {//打开图库，选择图片
    let that=this
    that.setData({ motto: "选择图片" }),
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success:function(res){
        console.log(res,"11111111111111111111111")
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;//注意是数组
        that.setData({fileList:that.data.fileList.concat(tempFilePaths)})
        console.log(that.data.fileList,"filelist")
        console.log(tempFilePaths[0]);
        that.setData({imgFileLocalPath:tempFilePaths[0]});//取第一个元素
        that.setData({ motto: "已选择本地图片:"+that.data.imgFileLocalPath });
        that.setData({usermotto_uploadcos_class:'usermotto_uploadcos_show'});
        that.setData({needUploadFilePath:tempFilePaths[0]});
        that.setData({needUploadFileName:that.data.needUploadFilePath.substr(that.data.needUploadFilePath.lastIndexOf('/') + 1)});//提取文件名 
        console.log(that.data.needUploadFileName,"needUploadFileName")
        that.setData({uploadImg:that.data.uploadImg.concat(that.data.needUploadFileName)})
        console.log(that.data.uploadImg,"uploadImg")
        that.uploadImgFile2TC();//把该图片上传至腾讯云
      }
    })
  },//方法结束


//上传图片到cos
  uploadImgFile2TC:function(){
    var _this = this;
    console.log(cos);
    var filename=this.data.needUploadFileName;
    var filePath=this.data.needUploadFilePath;
    //上传文件
    cos.postObject({
        Bucket: app.globalData.COS_Bucket,
        Region: app.globalData.COS_Region,
        Key: 'goodsImg/' + filename,
        FilePath: filePath,
        onProgress: function (info) {
            console.log(JSON.stringify(info));      
        }
    }, function (err, data) {
        console.log(err || data);
        if(data!=null){
          var fileCosFilePath=data.Location;//上传成功之后，返回路径信息，用于后台存库
          console.log(fileCosFilePath,"fileCosFilePath")
          console.log("file cos path:="+fileCosFilePath);
          _this.setData({ motto: "腾讯云地址：" +fileCosFilePath});
          _this.setData({imgFileLocalPath:fileCosFilePath});//图片腾讯云返回的路径
          _this.setData({usermotto_uploadcos_class:'usermotto_uploadcos_hide'});
        }      
    });
  },
  //删除已选图片{}
  deleteImage:function(event){
    let that=this
    console.log(that.data.fileList,"filelist11111111111111")
    console.log(that.data.uploadImg,"uploadImg1111111111111")
    var filename=event.currentTarget.dataset.url.substr(that.data.needUploadFilePath.lastIndexOf('/') + 1)
    console.log(filename,"filename")
    cos.deleteObject({
      Bucket: app.globalData.COS_Bucket,
      Region: app.globalData.COS_Region,
      Key: 'goodsImg/' + filename,
    }, function (err, data) {
      console.log(event,"delete")
      let index=event.currentTarget.dataset.index
       console.log(index,"index22222222222222222")
       let removeIndex=that.data.fileList.length-index
       if(removeIndex==0){
        let img=that.data.fileList.splice(1)      
        let imgu=that.data.uploadImg.splice(1)
       }else{
         let img2=that.data.fileList.splice(index,1)   
         let imgu2=that.data.uploadImg.splice(index,1)       
       }
        that.setData({fileList:[].concat(that.data.fileList)})
        that.setData({uploadImg:[].concat(that.data.uploadImg)})
    });
    console.log(that.data.fileList,"filelist11111111111111fff")
    console.log(that.data.uploadImg,"uploadImg1111111111111fff")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
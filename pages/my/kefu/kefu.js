var app = getApp();


Page({

      /**
       * 页面的初始数据
       */
      data: {
            weixin:"lll",
            qq: "82717110",
            phone: "18784184984",
            banner: "/images/kefu.jpg"
      },
      onLoad() {

      },

      //复制
      copy(e) {
            wx.setClipboardData({
                  data: e.currentTarget.dataset.copy,
                  success: res => {
                        wx.showToast({
                              title: '复制' + e.currentTarget.dataset.name+'成功',
                              icon: 'success',
                              duration: 1000,
                        })
                  }
            })
      },
      //电话拨打
      phone(e) {
            wx.makePhoneCall({
                  phoneNumber: e.currentTarget.dataset.phone
            })
      },
      //预览图片
      preview(e) {
            wx.previewImage({
                  urls: e.currentTarget.dataset.link.split(",")
            });
      },
})
//接口文件
let api="http://192.168.43.7:8080/shctps"
let imageUrl="https://shctps-1304936287.cos.ap-chengdu.myqcloud.com"
var config={
   login_url:`${api}/user/miniLogin`,
   register_url:`${api}/user/miniReg`,
   category_url:`${api}/goods/getCategory`,
   categoryImage_url:`${imageUrl}/categoryImg/`,
   banner_url:`${api}/manager/getBanner`,
   bannerImage_url:`${imageUrl}/goodsImg/`,
   publish_url:`${api}/goods/releaseDo`,
   upload_url:`${api}/goods/upload`,
   uploadImag_url:"http://shctps-1304936287.cos.ap-chengdu.myqcloud.com/goodsImg/",
   recommendGoods_url:`${api}/goods/getDailyRecommendation`,
   search_url:`${api}/goods/searchGoods`,
   classify_url:`${api}/goods/getGoodsByCategory`,
   user_url:`${api}/user/getUser`,
   post_url:`${api}/post/releasePost`,
   getPost_url:`${api}/post/getPosts`,
   getComment_url:`${api}/post/getReview`,
   postComment_url:`${api}/post/comment`,
   getBuy_url:`${api}/order/selectOrderByPayer`,
   buy_url:`${api}/order/addOrder`,//立即购买
   confirm_url:`${api}/order/confirmOrder` ,//确认出货
   getConfirm_url:`${api}/order/getToBeConfirmed`,
   delPublish_url:`${api}/goods/delGoods`,//删除发布
   fabuHistory_url:`${api}/goods/getReleaseHistory`,
   cancel_url:`${api}/order/cancelOrder`,//取消订单
   docollection_url:`${api}/goods/addGoodsCollection`,
   cancelGoodsCollection_url:`${api}/goods/cancelGoodsCollection`,//取消收藏
   isCollection_url:`${api}/goods/isCollection`,//是否收藏
   myCollection_url:`${api}/goods/getGoodsCollection`,
   cancelGoodsCollection_url2:`${api}/goods/cancelGoodsCollection2`,
   getToBeReviewedByUid_url:`${api}/goods/getGoodsByUidState`,
   delGoods_url:`${api}/goods/delGoods`,//取消审核中的商品
   getUserInfo_url:`${api}/user/getUser`,//获取用户信息
   setUserInfo_url:`${api}/user/editUserDo`,//编辑用户信息
   notice_url:`${api}/user/getNotice`,//  获取公告信息
   feedback_url:`${api}/user/addFeedback`
}

module.exports = config;
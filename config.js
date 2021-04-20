//接口文件
let api="http://192.168.0.103:8080/shctps"
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
   user_url:`${api}//user/getUser`
}
module.exports = config;
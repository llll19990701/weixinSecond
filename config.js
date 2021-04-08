//接口文件
let api="http://192.168.43.7:8080/shctps"
let imageUrl="https://shctps-1304936287.cos.ap-chengdu.myqcloud.com"
var config={
   login_url:`${api}/user/miniLogin`,
   register_url:`${api}/user/miniReg`,
   category_url:`${api}/goods/getCategory`,
   categoryImage_url:`${imageUrl}/categoryImg/`,
   banner_url:`${api}/manager/getBanner`,
   bannerImage_url:`${imageUrl}/goodsImg/`
}
module.exports = config;
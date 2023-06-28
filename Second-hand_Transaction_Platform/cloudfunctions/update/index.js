// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection("user").where({
    username:event.username
  }).update({
    data:{
      username:event.username,
      password:event.password,
      stunum:event.stunum,
      phonenum:event.phonenum,
      qqnum:event.qqnum,
      wxnum:event.wxnum,
      headimg: event.headimg
    }})
    
  
}
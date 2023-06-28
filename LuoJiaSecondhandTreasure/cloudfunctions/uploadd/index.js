// 云函数入口文件

const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection("goods").add({
    data:{
      imageFileList: event.imageFileList,
      price: event.price,
      lable: event.lable,
      information: event.information,
      time: event.time,
      isSold: event.isSold,
      publisher: event.publisher,
      headimg: event.headimg
    }
  })
  }
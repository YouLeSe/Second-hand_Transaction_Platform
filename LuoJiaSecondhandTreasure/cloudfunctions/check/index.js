// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
   
  let{ username } = event
  console.log(event)
  let { OPENID, APPID } = cloud.getWXContext()
  let toast,feedBack
  
  await db.collection('user').where(_.or([
    {
      username :event.username,
    }
  ]))
  .get().then(res=>{
    console.log(res.data)
    if(res.data.length!==0){
      toast="该用户名已被使用";
      feedBack=false;
    }
    else{
      feedBack=true;
    }
  })
  return {OPENID,APPID,toast,feedBack}
}
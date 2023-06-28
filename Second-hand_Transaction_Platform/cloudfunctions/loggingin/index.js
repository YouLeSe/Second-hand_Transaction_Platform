// 云函数入口文件

const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
   
  let{ username,password } = event
  let { OPENID, APPID } = cloud.getWXContext()
  let toast,feedBack,user
  
  await db.collection('user').where(_.or([
    {
      username :event.username,
    }
  ]))
  .get().then(res=>{
    console.log(res.data)
    if(res.data.length===0){
      toast="用户不存在";
      feedBack=false;
      console.log(feedBack);
    }
    else if(res.data[0].password!==event.password){
      toast="密码不正确";
      feedBack=false;
    }
    else{
      toast="成功登陆";
      feedBack=true;
      user=res.data;
    }
  })
  return {OPENID,APPID,toast,feedBack,user}
}
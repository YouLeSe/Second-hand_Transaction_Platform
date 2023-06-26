// pages/register/register.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    username: "",
    password:"",
    repassword:"",
    phonenum:"",
    qqnum:"",
    wxnum:"",
    stunum:""
  },
  onChangeUsername(ev)
  {
    this.setData({
      username: ev.detail
    })
  },
  onChangeStunum(ev)
  {
    this.setData({
      stunum: ev.detail
    })
  },
  onChangeUsername(ev)
  {
    this.setData({
      username: ev.detail
    })
  },
  onChangePassword(ev)
  {
    this.setData({
      password: ev.detail
    })
  },
  onChangeRepassword(ev)
  {
    this.setData({
      repassword: ev.detail
    })
  },
  onChangePhonum(ev)
  {
    this.setData({
      phonenum: ev.detail
    })
  },
  register()
  {
    db.collection('user').where(_.or([
      {
        username:this.data.username,
      }
    ]))
      .get().then(res=>{
        console.log(res)
        this.setData({
          user:res.data
        })
    if(!this.data.username)
    {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
      
      return
    }
    if(!this.data.stunum)
    {
      wx.showToast({
        title: '请输入学号',
        icon: 'none'
      })
      return
    }
    if(!this.data.password)
    {
      wx.showToast({
        title: '请输入密码）',
        icon: 'none'
      })
      return
    }
    if(!this.data.repassword)
    {
      wx.showToast({
        title: '请确认密码',
        icon: 'none'
      })
      return
    }
    if(!this.data.phonenum)
    {
      wx.showToast({
        title: '请输入电话号码',
        icon: 'none'
      })
      return
    }
    if(this.data.stunum.length!==13){
      wx.showToast({
        title: '请输入正确的学号',
        icon: 'none'
      })
      return
    }
    if(this.data.password!==this.data.repassword){
       wx.showToast({
        title: '两次密码输入不正确',
        icon: 'none'
      })
      return
      }
      if(this.data.password.length<6){
        wx.showToast({
         title: '请输入6位数以上密码',
         icon: 'none'
       })
       return
       }
    if(this.data.phonenum.length!==11){
      wx.showToast({
        title: '请输入正确的电话号',
         icon: 'none'          
      })
      return
      }
      wx.cloud.callFunction({
        name:"register",
        data:{
          username: this.data.username,
          password: this.data.password,
          stunum: this.data.stunum,
          phonenum: this.data.phonenum,
          qqnum: this.data.qqnum,
          wxnum: this.data.wxnum
        }
      })
      if(this.data.user[0])
    {
      wx.showToast({
        title: '该用户名已存在',
        icon: 'none'
      })
      return
    }
     wx.showToast({
      title: '成功注册',
     })
     wx.navigateBack({
      url: '/pages/center/center?user={{this.data.user}}',
    })
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
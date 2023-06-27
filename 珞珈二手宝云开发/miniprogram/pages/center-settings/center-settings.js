// pages/center-settings/center-settings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password:"",
    repassword:"",
    phonenum:"",
    qqnum:"",
    wxnum:"",
    stunum:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  // 监听用户名输入
  handleUsernameInput(event) {
    this.setData({
      username: event.detail
    });
  },

  // 监听电话输入
  handlePhoneInput(event) {
    this.setData({
      phone: event.detail
    });
  },

  // 监听QQ输入
  handleQQnumInput(event) {
    this.setData({
      qqnum: event.detail
    });
  },

  // 监听微信输入
  handleWXnumInput(event) {
    this.setData({
      wxnum: event.detail
    });
  },

  // 监听密码输入
  handlePasswordInput(event) {
    this.setData({
      password: event.detail
    });
  },

  // 监听学号输入
  handleStunumInput(event) {
    this.setData({
      stunum: event.detail
    });
  },

  update()
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
      title: '请输入手机号',
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
    name:"update",
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
      title: '成功修改用户信息',
     })
     wx.navigateBack({
      url: '/pages/center/center?user={{this.data.user}}',
    })
    })
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
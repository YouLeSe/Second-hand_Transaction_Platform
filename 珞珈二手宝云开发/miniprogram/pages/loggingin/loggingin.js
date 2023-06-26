// pages/logingin/logingin.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    username:"",
    password:""
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
  toRegister()
  {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  loggingin()
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
        if(!this.data.password)
        {
          wx.showToast({
            title: '请输入密码',
            icon: 'none'
          })
          return
        }
        if(!this.data.user[0])
        {
          wx.showToast({
            title: '该用户不存在',
            icon: 'none'
          })
          return
        }
        if(this.data.password!==this.data.user[0].password)
        {
          wx.showToast({
            title: '密码输入不正确',
            icon: 'none'
            
          })
          return
        }
        let pages = getCurrentPages(); // 当前页的数据，
        console.log(pages)
        let prevPage = pages[pages.length - 2]; // 上一页的数据
        prevPage.setData({
          user: this.data.user, // 修改上一页的属性值；
        })
        wx.navigateBack({
          delta: 1
        })      
      })
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){

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
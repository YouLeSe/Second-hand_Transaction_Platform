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
  
    wx.cloud.callFunction({
      name: "loggingin",
      data:{
        username: this.data.username,
        password: this.data.password
      }
    })
    .then(res=>{
        console.log(res)
        if(!res.result.feedBack)
        {
          wx.showToast({
            title: res.result.toast,
            icon: 'none'
          })
          return
        }
        else
        {
          this.setData({
            user:res.result.user
          })
          let user = wx.getStorageSync('user')
          user= this.data.user
          wx.setStorageSync('user', user)
          let pages = getCurrentPages(); // 当前页的数据，
          console.log(pages)
          let prevPage = pages[pages.length - 2]; // 上一页的数据
          prevPage.setData({
            user: this.data.user, // 修改上一页的属性值；
          })
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: res.result.toast,
            icon: 'none'
          })
        }
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
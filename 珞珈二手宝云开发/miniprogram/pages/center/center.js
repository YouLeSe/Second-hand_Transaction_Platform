// pages/center/center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
  },
  gotoLogin(){
    wx.navigateTo({
      url: "/pages/loggingin/loggingin",
    })
  },
  gotoScoreRecord(){
    wx.navigateTo({
      url: "/pages/center-scoreRecord/center-scoreRecord",
    })
  },
  gotoMyCollection(){
    wx.navigateTo({
      url: "/pages/center-myCollection/center-myCollection",
    })
  },
  gotoMyCommodity(){
    wx.navigateTo({
      url: "/pages/center-myCommodity/center-myCommodity",
    })
  },
  gotoMyHistory(){
    wx.navigateTo({
      url: "/pages/center-myHistory/center-muHistory",
    })
  },
  gotoSuggestions(){
    wx.navigateTo({
      url:"/pages/center-suggestions/center-suggestions",
    })
  },
  gotoSettings(){
    wx.navigateTo({
      url: "/pages/center-settings/center-settings",
    })
  },
  gotoAboutUs(){
    wx.navigateTo({
      url: "/pages/center-aboutUs/center-aboutUs",
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
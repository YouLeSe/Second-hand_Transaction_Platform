// pages/search/searchResult.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsName:String,
    product:[]
  },

  gotoSearch()
  {
    console.log("跳转到搜索页面")
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  search(){
    db.collection('database1').where(_.or([
      {
        information:db.RegExp({
          regexp:this.data.goodsName,
          options:'i',
        })
      }
    ]))
      .get().then(res=>{
        this.setData({
          product:res.data
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      goodsName:decodeURIComponent(options.goodsName)
    })
    this.search()
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
    wx.navigateBack({
      url: '/pages/home/home',
    })
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
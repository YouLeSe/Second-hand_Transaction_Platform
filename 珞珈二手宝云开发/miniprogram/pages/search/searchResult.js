// pages/search/searchResult.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsName:String,
    dataList:[],
    page: 0,
    num: 10,
    isLoading: false
  },

  gotoSearch()
  {
    console.log("跳转到搜索页面")
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  search(){
    this.setData({
      isLoading: true
    })
    wx.showLoading({
      title: '正在加载',
    })
    db.collection('goods').where(_.or([
      {
        information:db.RegExp({
          regexp:this.data.goodsName,
          options:'i',
        }),
      }
    ]))
      .limit(this.data.num).skip(this.data.page).get().then(res=>{
        console.log(res)
        this.setData({
          dataList:res.data 
        })
        wx.hideLoading()
        this.setData({
          isLoading: false
        })
        wx.stopPullDownRefresh()

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
    this.setData({
      dataList:[],
      page: 0,
    })
    this.search()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.setData({
      page: this.data.page + this.data.dataList.length,

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
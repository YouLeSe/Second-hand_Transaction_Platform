// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    dataList:[]
  },
  
  getData(num=4,page=0){
    wx.cloud.callFunction({
      name:"getallitem",
      data:{
        num:num,
        page:page
      }
    }).then(res=>{
      console.log(res)
      console.log(res.result.data + "hello")
      //实现翻页再缓存
      var oldData=this.data.dataList;
      var newData=oldData.concat(res.result.data);
      this.setData({
        dataList:newData
      })
    })
  },

  gotoSearch()
  {
    console.log("跳转到搜索页面")
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  gotoPublish(){
    console.log("跳转到发布页面")
    wx.navigateTo({
      url: '/pages/_upload/_upload',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
    let user = wx.getStorageSync('user')
    if(user)
    {
        this.setData({
        user: user
      })
    }
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
    let user = wx.getStorageSync('user')
    if(!user)
    {
      this.setData({
        user:{}
      })
    }
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
    var page = this.data.dataList.length;
    this.getData(2,page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
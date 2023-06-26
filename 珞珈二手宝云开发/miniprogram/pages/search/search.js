// pages/search/search.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:'',//要搜索的内容
    product:[],
    historyArr:[]
  },
  onChange(ev){
    this.setData({
      searchValue:ev.detail,
    })
  },
  async startSearch(){
    let value = this.data.searchValue
    if(!value||!value.length||!value.trim())
    {
      console.log("不能搜索空内容")
      wx.showToast({
        title: '不能搜索空内容',
        icon :'error',
        duration : 1500
      })
      return
    }
    //将搜索的内容保存到本地
    
    let historyArr = wx.getStorageSync('historyArr')
    //如果不存在记录 
    if(!historyArr){
      historyArr = [value]
    }
    //如果已经存在，
    //就删掉以前的记录,加入新的记录 
    else{
        let index = historyArr.indexOf(value)
        if(index!==-1){
          historyArr.splice(index,1)
        }
            //最多存储10条记录  
        if(historyArr.length ==10)
        {
          historyArr.pop()
        }
        historyArr.unshift(value)

    }
    wx.setStorageSync('historyArr', historyArr)
  
  //   db.collection('datebase1').where(_.or([
  //   {
  //     information:db.RegExp({
  //       regexp:this.data.searchValue,
  //       options:'i',
  //     })
  //   }
    
    
  // ]))
  //   .get().then(res=>{
  //     console.log(res.date);
  //     this.setData({
  //       product:res.date
  //     })
  //   })
    
  wx.navigateTo({
    url: '/pages/search/searchResult?goodsName='+encodeURIComponent(this.data.searchValue),
  })
  },
  //清空数据
  clearHistory()
  {
    this.setData({
      historyArr:[]
    })
    wx.removeStorageSync('historyArr')
  },

  tapHistory(e)
  {
    console.log(e)
    let historyArr = wx.getStorageSync('historyArr')
    console.log(historyArr)
    let index = historyArr.indexOf(e.target.dataset.value)
    console.log(index)
    historyArr.splice(index,1)
    historyArr.unshift(e.target.dataset.value)
    wx.setStorageSync('historyArr', historyArr)
    wx.navigateTo({
      url: '/pages/search/searchResult?goodsName='+encodeURIComponent(e.target.dataset.value),
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
    console.log("历史记录")
    let historyArr = wx.getStorageSync('historyArr')
    this.setData({
      historyArr:historyArr
    })
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
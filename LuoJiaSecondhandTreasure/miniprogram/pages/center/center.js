// pages/center/center.js
const db = wx.cloud.database()
const _ = db.command
var urlArr=[];
var filePath=[];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    show: false,
    headimg:"",
  },
  
clickBtn(){
  wx.chooseImage({
    success:res=>{
      filePath=res. tempFilePaths
      console.log(res)
      filePath. forEach((item, idx)=>{
        var fileName=Date. now()+"_"+idx;
        this. cloudFile(fileName, item)
      })
    },
    catch:res=>{
      wx. showLoading({
        title: '上传失败',
      })
      return
    },
  })
  this.onClose()
  console.log(this.data)


  // wx.cloud.callFunction({
  //   name:"uploudHeadImg",
  //   data:{
  //     headimg: this.data.headimg,
  //   }
  // })
},
    
cloudFile(filiname, path){
  wx. showLoading({
    title: '上传中…',
  })
  console.log(path)
  wx. cloud. uploadFile({
    cloudPath:"headimg/"+filiname+".jpg",
    filePath:path,
  }). then(res=>{
    console.log(res)
    this.data.headimg=res.fileID
    urlArr. push(res.fileID)
    if(filePath. length==urlArr.length){
      this. setData({
        urlArr
      })
    }
    wx. hideLoading()
    wx.cloud.callFunction({
      name: "updataheadimg",
      data:{
        headimg: this.data.headimg,
        username: this.data.user[0].username,
      }
    })
    .then(res=>{
      db.collection('user').where(_.or([{
        username:this.data.user[0].username
      }]))
      .get().then(res=>{
        console.log(res)
        this.setData({
          user: res.data
        })
        let user = wx.getStorageSync('user');
        user= this.data.user;
        wx.setStorageSync('user', user);
       })
    })
  })
},

  gotoTreeRule(){
    wx.navigateTo({
      url: "/pages/treeRule/treeRule",
    })
  },

  toShowPopup(e){
      this.showPopup()
  },

  gotoLogin(){
    wx.navigateTo({
      url: "/pages/loggingin/loggingin",
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
      url: "/pages/center-suggestions/center-suggestions",
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

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  uploadHeadimg(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  //页面加载时，如果登陆过在user缓存中提取用户信息
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
  //页面显示时，刚刚登陆则将用户信息存储到user缓存里
  onShow() {
    let user = wx.getStorageSync('user')
    if(!user)
    {
      this.setData({
        user:{}
      })
    }
    if(user)
    {
        this.setData({
        user: user
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
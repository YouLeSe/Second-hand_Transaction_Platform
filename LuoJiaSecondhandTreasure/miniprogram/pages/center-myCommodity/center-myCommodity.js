// pages/center-myCommodity/center-myCommodity.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    dataList:[],
    page: 0,
    num: 10,
    score: 0,
    isLoading: false,
    isdelete: false,
    ischeck: false,
    show: false,
  },
  popup(){
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  gotobook(){
    console.log("aaa")
  },
  //放大图片
toPreview(e){
  console.log(e.target.dataset)
  let url=e.target.dataset.imagefilelist
  let index=e.target.dataset.index
  let length=url.length
  let list=[]
  for (let i = 0; i <length; i++) {
    list[i]=url[i].url
}
  wx.previewImage({
    urls: list,
    current:list[index],
    // current:" ",
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
        publisher: this.data.user[0].username,
      }
    ]))
    .orderBy('currenttime','desc').limit(this.data.num).skip(this.data.page).get().then(res=>{
        console.log(res)
        this.setData({
          dataList: this.data.dataList.concat(res.data)
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
 


check(ev){
  
  if(this.data.ischeck)
    return
  else{
    this.setData({
      ischeck: true
    })
  let goods = ev.currentTarget.dataset.item;  
  wx.cloud.callFunction({
    name:"checkGoods",
    data:{
      _id: goods._id,
      isSold: goods.isSold,
    }
  }).then(res=>{
  if(goods.isSold===false)
  {
    
    this.onLoad()
    wx.showToast({
      title: '商品已下架',
    })
      
    
  }
  else
  {
    
    this.onLoad()
    wx.showToast({
      title: '商品已上架',
    })
    
  }
  })
}

},

delete(ev){
  if(this.data.isdelete)
    return
  else{
  this.setData({
    isdelete: true
  })
  let goods = ev.currentTarget.dataset.item;
  let price=goods.price
  this.data.score=price
  
  console.log(ev)
  console.log(goods)
  console.log(this.data)
  let sc
  if(!this.data.user[0].score)
    sc=0;
  else
    sc=this.data.user[0].score
  
  console.log(this.data.user[0].score) 
  console.log(sc)  
  let newScore=sc+parseFloat(goods.price)
  console.log(newScore)
  
  wx.cloud.callFunction({
    name:"renewScore",
    data:{
      score:newScore,
      username:goods.publisher,
    }
  })
  .then(res=>{
    db.collection('user').where(_.or([{
      username:goods.publisher,
    }]))
    .get().then(res=>{
      console.log(res)
      this.setData({
        user: res.data
      })
      console.log("abc");
      let user = wx.getStorageSync('user');
      user= this.data.user;
      wx.setStorageSync('user', user);
    })
  }),


  console.log(ev)
  console.log(goods.imageFileList.length)
  if(goods.imageFileList.length===1)
  {
    wx.cloud.deleteFile({
      //微信云储存中的文件唯一身份fileID，最多可删除50条   
      fileList:[goods.imageFileList[0].url]   
    })
}
  else if(goods.imageFileList.length===2)
  {
  wx.cloud.deleteFile({
    //微信云储存中的文件唯一身份fileID，最多可删除50条   
    fileList:[goods.imageFileList[0].url,goods.imageFileList[1].url]   
  })
}
  else
  {
  wx.cloud.deleteFile({
  //微信云储存中的文件唯一身份fileID，最多可删除50条   
  fileList:[goods.imageFileList[0].url,goods.imageFileList[1].url,goods.imageFileList[2].url]   
})
}
  wx.cloud.callFunction({
    name:"deleteGoods",
    data:{
      _id: goods._id,
    }
  }).then(res=>{
    this.onClose()
    this.onLoad()
  })
}
  
},

onLoad(options) {
  this.setData({
    dataList:[],
    page: 0,
    num: 10,
    isLoading: false,
    isdelete: false,
    ischeck: false,
  })
  console.log("页面重新加载")
  let user = wx.getStorageSync('user')
  if(user)
  {
      this.setData({
      user: user
    })
  }
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
    this.search()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
// pages/home/home.js
const db = wx.cloud.database()
const _ = db.command
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    dataList:[],
    num:5,
    page:0,
    qq_show:false,
    wx_show:false,
    phone_show:false,
    clctList:[],
    isCollection:false,
    lable:"全部"
  },
  // index.js
 //跳转至搜索页面
  gotoSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
//当切换导航栏时
  onChange(ev){
    let lable = ev.detail.title;
    this.setData({
      lable: lable,
      page: 0
    })
      this.classify(lable)
    
  },
//获得QQ号
  getqqNum(e) {
    let key = e.currentTarget.dataset.qqnum;
    if(!key){
      wx.showToast({
        title: '该用户没有QQ',
        icon: "error",
      })
      return
    }
    wx.setClipboardData({ //设置系统剪贴板的内容
      data: key,
      success(res) {
        console.log(res, key);
        wx.showToast({
          title: '成功复制QQ号',
        })
      }
    })
  },
//获得微信号
  getwxNum(e) {
    let key = e.currentTarget.dataset.wxnum;
    if(!key){
      wx.showToast({
        title: '该用户没有微信',
        icon: "error",
      })
      return
    }
    wx.setClipboardData({ //设置系统剪贴板的内容
      data: key,
      success(res) {
        console.log(res, key);
        wx.showToast({
          title: '成功复制微信号',
        })
      }
    })
  },
//获得电话号码
  getphoneNum(e) {
    let key = e.currentTarget.dataset.phonenum;
    if(!key){
      wx.showToast({
        title: '该用户没有电话',
        icon: "error",
      })
      return
    }
    wx.setClipboardData({ //设置系统剪贴板的内容
      data: key,
      success(res) {
        console.log(res, key);
        wx.showToast({
          title: '成功复制电话号码',
        })
      }
    })
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
//收藏商品
addcollection(e){
  console.log(e)
  //如果未登录，直接跳转到登录
  if(!this.data.user[0])
  {
    wx.navigateTo({
      url: '/pages/loggingin/loggingin',
    })
  }
  else
  { 
    if(this.data.isCollection)
      return
    else{
      let collection = Boolean;
      this.setData({
        isCollection: true
      })
      let item = e.currentTarget.dataset.item;
      console.log(this.data.clctList.length)
      if(this.data.clctList.length!==0){
        console.log("bb")

      let arr = this.data.clctList.filter((items) => {return items._id !== item._id})
      console.log(arr)
      if(arr.length===this.data.clctList.length)
      {
        collection= false;
        item.currenttime = new Date()
        this.data.clctList.unshift(item)
        console.log(this.data.clctList)
      }
      else
      {
        collection= true;
        console.log("aa")
        this.setData({
          clctList: arr
        })

      }
    }else{
      collection= false;
      console.log("aa")
      this.setData({
        clctList: [item]
      })
      console.log(this.data.clctList)
    }
      //对user增加一个clctList数组字段
      wx.cloud.callFunction({
        name:"addclct",
        data:{
          username:this.data.user[0].username,
          clctList:this.data.clctList
        }
      })
      .then(res=>{
        db.collection("user").where(_.or([{
          username:this.data.user[0].username
        }]))
        .get().then(res=>{
          console.log(res.data)
          this.setData({
            user: res.data,
          })
          let user = wx.getStorageSync('user');
          user= this.data.user;
          wx.setStorageSync('user', user);
          this.setData({
            isCollection: false
          })
          console.log(collection)
          if(collection===false){
             wx.showToast({
            title: '已收藏',
          })
          }
          else{
            wx.showToast({
              title: '已取消收藏',
            })
          }
         
      })
    })
  }
}
},
//搜索出所有上架商品
  search(ev){
    this.setData({
      isLoading: true
    })
    wx.showLoading({
      title: '正在加载',
    })
    if(ev==="全部"){
      db.collection('goods').where(_.and([
        {
          isSold:false,
        }
      ]))
      .orderBy('currenttime','desc').limit(this.data.num).skip(this.data.page).get().then(res=>{
          this.setData({
            dataList: this.data.dataList.concat(res.data)
          })
          wx.hideLoading()
          this.setData({
            isLoading: false
          })
          wx.stopPullDownRefresh()

        })
    }
    else{
      db.collection('goods').where(_.and([
        {
          isSold:false,
          lable:ev,
        }
      ]))
      .orderBy('currenttime','desc').limit(this.data.num).skip(this.data.page).get().then(res=>{
          console.log(res.data)
          this.setData({
            dataList: this.data.dataList.concat(res.data)
          })
          wx.hideLoading()
          this.setData({
            isLoading: false
          })
          wx.stopPullDownRefresh()
        })
    }
  },
//分类
classify(ev){
  this.setData({
    isLoading: true
  })
  wx.showLoading({
    title: '正在加载',
  })
  if(ev==="全部"){
    db.collection('goods').where(_.and([
      {
        isSold:false,
      }
    ]))
    .orderBy('currenttime','desc').limit(this.data.num).skip(this.data.page).get().then(res=>{
        this.setData({
          dataList: res.data
        })
        wx.hideLoading()
        this.setData({
          isLoading: false
        })
        wx.stopPullDownRefresh()

      })
  }
  else{
    db.collection('goods').where(_.and([
      {
        isSold:false,
        lable:ev,
      }
    ]))
    .orderBy('currenttime','desc').limit(this.data.num).skip(this.data.page).get().then(res=>{
        console.log(res.data)
        this.setData({
          dataList: res.data
        })
        wx.hideLoading()
        this.setData({
          isLoading: false
        })
        wx.stopPullDownRefresh()
      })
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  //页面加载时
  onLoad(options) {    
    this.search(this.data.lable)
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
    if(user)
    {
        this.setData({
        user: user,
        clctList: user[0].clctList,
      })
    }
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
    this.search(this.data.lable)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.setData({
      page: this.data.page + this.data.num,
    })
    this.search(this.data.lable)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
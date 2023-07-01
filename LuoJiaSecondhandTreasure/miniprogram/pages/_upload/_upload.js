// pages/upload/upload.js
const db = wx.cloud.database()
const _ = db.command

const options = [
  {
    text: '书籍',
    value: '书籍',
  },
  {
    text: '日用品',
    value: '日用品',
  },
  {
    text: '数码',
    value: '数码',
  },
  {
    text: '服装',
    value: '服装',
  },
  {
    text: '车类',
    value: '车类',
  },
];

Page({
  data: {
    user: {},
    show: false,
    options,
    fieldValue:"",
    isupload:false,

    imageFileList: [],
    price:"",
    lable:"",
    information:"",
    time:"",
    isSold:false,
    publisher:"",

    checked: false,
  },

  _upload(){
    if(this.data.isupload)
      return
    else{
    let timex;
    const currenttime = new Date()
    const now=new Date()
    const year=now.getFullYear()
    const month=now.getMonth()+1
    const day=now.getDate()
    let hour=now.getHours()
    let minute=now.getMinutes()
    let second=now.getSeconds()
    if(hour<'10')
      hour='0'+hour
    if(minute<'10')
      minute='0'+minute
    if(second<'10')
      second='0'+second
      
    timex=year+"."+month+"."+day+" "+hour+":"+minute+":"+second
    this.data.time=timex

    if(!this.data.information)
    {
      wx.showToast({
        title:"请输入商品信息",
        icon:"none"
      })
      return
    }
    if(!this.data.price)
    {
      wx.showToast({
        title:"请输入商品期望价格",
        icon:"none"
      })
      return
    }
    else
    {
      this.setData({
        isupload: true
      })
      let str=this.data.price
      let patt1 = /[0-9]+/;
      let str1=str.match(patt1)
      console.log(str)
      //console.log(str1[0])
      //console.log(str1.)
      if(!str1)
      {
        wx.showToast({
          title:"价格只能为数字",
          icon:"none"
        })
        this.setData({
          isupload:false
        })
        return
      }
      else if(str!==str1[0])
      {
        wx.showToast({
          title:"价格只能为数字",
          icon:"none"
        })
        this.setData({
          isupload:false
        })
        return
      }
    }
    if(!this.data.lable)
    {
      wx.showToast({
        title:"请设置商品分类",
        icon:"none"
      })
      this.setData({
        isupload:false
      })
      return
    }
    if(!this.data.imageFileList[0])
    {
      wx.showToast({
        title:"请上传商品图片",
        icon:"none"
      })
      this.setData({
        isupload:false
      })
      return
    }

    this.setData({
      publisher: this.data.user[0].username
    })
    db.collection('user').where(_.or([{
      username:this.data.user[0].username
    }]))
    .get().then(res0=>{
      console.log("11111")
      console.log(res0)
      if(res0.data.length===0){
        wx.showToast({
          title: '本用户不存在请重新注册',
          icon:"none"
        })
        this.setData({
          isupload:false
        })
        return
      }
    wx.cloud.callFunction({
      name:"uploadd",
      data:{
        imageFileList: this.data.imageFileList,
        price: this.data.price,
        lable: this.data.lable,
        information: this.data.information,
        time: this.data.time,
        isSold: this.data.isSold,
        publisher: this.data.publisher,
        headimg:this.data.user[0].headimg,
        qqnum:this.data.user[0].qqnum,
        phonenum:this.data.user[0].phonenum,
        wxnum:this.data.user[0].wxnum,
        currenttime:currenttime
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        information:"",
        price:"",
        lable:"",
        fieldValue:"",
        imageFileList:[]
      })
      this.setData({
        isupload:false
      })
      wx.navigateBack()
      wx.showToast({
        title: '上传成功',
      })
    })
    })
  }

  },
//封装上传图片函数,利用小程序云函数
  uploadFilePromise(fileItem) {
    // TODO:优化-带上用户标示作为区分
    const imageName = fileItem?.url.slice(11, -4).slice(0,6);
    //console.log(`imageName`, imageName)

    return wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: `images/${imageName}.png`,
      // 指定要上传的文件的小程序临时文件路径
      filePath: fileItem.url,
    });
  },

  // 文件读取完成后触发，event.detail.file: 当前读取的文件，再上传到图片服务器上
  afterRead(event) {
    console.log(event)
    console.log(this.data)
    wx.showLoading({
      title: '上传中...'
    })
    const { file } = event.detail //获取所需要上传的文件列表
    wx.cloud.init();
    
    const uploadTasks = file.map(fileItem => this.uploadFilePromise(fileItem));
    Promise.all(uploadTasks)
      .then(data => {
        console.log(data)
        wx.hideLoading()
        wx.showToast({ title: '上传成功', icon: 'none' });
        const newFileList = data.map(item => ( {url:item.fileID} ));
        // this.imageFileId.unshift(item.fileID)
        let index= event.detail.index
        this.setData({ 
          imageFileList: this.data.imageFileList.concat(newFileList)
        });
      })
      .catch(() => {
          //存在有上传失败的文件
          wx.hideLoading()
          wx.showToast({
            title: '上传失败！',
            icon: 'none',
          })
      });
  },
  
  deleteImg(event){
    let index= event.detail.index
    console.log(index)
    console.log(event)
    console.log(this.data)
    this.data.imageFileList.splice([index],1)
    this.setData({ imageFileList: this.data.imageFileList});
  },

  gotoLogin(){
    // console.log(this.data.user)
    if(!this.data.user[0])
    {
      wx.navigateTo({
        url: "/pages/loggingin/loggingin",
      })
    }
  },

  onClick() {
    this.setData({
      show: true,
    });
  },

  onClose() {
    this.setData({
      show: false,
    });
  },

  onFinish(e) {
    const { selectedOptions, value } = e.detail;
    const fieldValue = selectedOptions
        .map((option) => option.text || option.name)
        .join('/');
    this.setData({
      lable: value,
      fieldValue,
    })
  },
  onChangePrice(ev){
    this.setData({
      price: ev.detail
    })
  },

  onChangeInformation(ev){
    this.setData({
      information: ev.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
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
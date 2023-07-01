// pages/register/register.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    isRegister:false,
    username: "",
    password:"",
    repassword:"",
    phonenum:"",
    qqnum:"",
    wxnum:"",
    stunum:""
  },
  onChangeUsername(ev)
  {
    this.setData({
      username: ev.detail
    })
  },
  onChangeStunum(ev)
  {
    this.setData({
      stunum: ev.detail
    })
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
  onChangeRepassword(ev)
  {
    this.setData({
      repassword: ev.detail
    })
  },
  onChangePhonum(ev)
  {
    this.setData({
      phonenum: ev.detail
    })
  },
  onChangeQQnum(ev)
  {
    this.setData({
      qqnum: ev.detail
    })
  },
  onChangeWXnum(ev)
  {
    this.setData({
      wxnum: ev.detail
    })
  },
  register()
  {
    wx.cloud.callFunction({
      name:"check",
      data: {
        username:this.data.username,
      }
      
    })
    
    .then(res=>{
      if(!this.data.username)
      {
        wx.showToast({
          title: '请输入用户名',
          icon: 'none'
        })
        return
      }
      let str=this.data.username
      let patt1 = /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,10}$/;
      let str1=str.match(patt1)
      if(!str1||str!==str1[0])
      {
        wx.showToast({
          title:"用户名只能是2-10位的字母数字中文下划线",
          icon:"none"
        })
        return
      }
      if(!res.result.feedBack)
      {
        wx.showToast({
          title: res.result.toast,
          icon: 'none'
        })
        return
      }
      if(!this.data.stunum)
      {
        wx.showToast({
          title: '请输入学号',
          icon: 'none'
        })
        return
      }
      str=this.data.stunum
      patt1 = /[0-9]{13}$/;
      str1=str.match(patt1)
      if(!str1||str!==str1[0])
      {
        wx.showToast({
          title:"请输入正确的学号",
          icon:"none"
        })
        return
      }
      if(!this.data.password)
      {
        wx.showToast({
          title: '请输入密码',
          icon: 'none'
        })
        return
      }
      str=this.data.password
      patt1 =/^(?=.*[a-zA-Z])(?=.*\d).{6,16}$/;
      str1=str.match(patt1)
      if(!str1||str!==str1[0])
      {
        wx.showToast({
          title:"需位包含数字和字母的6-16位密码",
          icon:"none"
        })
        return
      }
      if(!this.data.repassword)
      {
        wx.showToast({
          title: '请确认密码',
          icon: 'none'
        })
        return
      }
      if(!this.data.phonenum&&!this.data.qqnum&&!this.data.wxnum)
      {
        wx.showToast({
          title: '必须填一个联系方式',
          icon: 'none'
        })
        return
      }
      str=this.data.phonenum
      patt1 = /^1[3456789]\d{9}$/;
      str1=str.match(patt1)
      if(this.data.phonenum&&(!str1||str!==str1[0]))
      {
        wx.showToast({
          title:"请输入正确的电话号码",
          icon:"none"
        })
        return
      }
      str=this.data.qqnum
      patt1 =/^[1-9][0-9]{4,9}$/
      str1=str.match(patt1)
      if(this.data.qqnum&&(!str1||str!==str1[0]))
      {
        wx.showToast({
          title:"请输入正确的QQ号",
          icon:"none"
        })
        return
      }
      str=this.data.wxnum
      patt1 =/^[a-zA-Z][a-zA-Z\d_-]{5,19}$/
      str1=str.match(patt1)
      if(this.data.wxnum&&(!str1||str!==str1[0]))
      {
        wx.showToast({
          title:"请输入正确的微信号",
          icon:"none"
        })
        return
      }
      if(this.data.password!==this.data.repassword){
        wx.showToast({
          title: '两次密码输入不正确',
          icon: 'none'
        })
        return
        }
      
      if(!this.data.isRegister){
        this.setData({
          isRegister: true
        });
      wx.cloud.callFunction({
        name:"register",
        data:{
          username: this.data.username,
          password: this.data.password,
          stunum: this.data.stunum,
          phonenum: this.data.phonenum,
          qqnum: this.data.qqnum,
          wxnum: this.data.wxnum,
          headimg:"cloud://cloud1-2gin805w947797b7.636c-cloud1-2gin805w947797b7-1318871747/you.jpg",
        }
      }).then(res=>{
          this.setData({
            isRegister: false
          })
          
          wx.navigateBack()
          wx.showToast({
            title: '成功注册',
          })   
        })
      
      }
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
// pages/profile/profile.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navIndex: 2,
    auth: false,
    register: false,
    number:'',
    pwd:'',
    name:''
  },
  handleInputChange: function (event) {
    const className = event.currentTarget.dataset.class; 
    const value = event.detail.value;
    this.setData({
      [className]: value,
    });
  },
  toRegister(){
    this.setData({
      register: true,
      number:'',
      pwd:'',
      name:''
    })
  },
  toLogin(){
    this.setData({
      register: false,
      number:'',
      pwd:'',
      name:''
    })
  },
  login(){
    const { number, pwd } = this.data;
    wx.request({
      url: 'http://127.0.0.1:8080/login', 
      method: 'POST',
      data: {
        "telId": number,
        "password": pwd
     },
      success: function (res) {
        if(res.data.code!=200){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          });
          return
        }
        wx.showToast({
          title: '提交成功',
          icon: 'success',
        });
        let token=res.data.data.token
        let userName=res.data.data.user.customerName
        let phoneNum=res.data.data.user.telId
        wx.setStorageSync('token', token );
        wx.setStorageSync('auth', true );
        wx.setStorageSync('user', userName );
        wx.setStorageSync('phone', phoneNum );
        setTimeout(()=>{
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }, 500)
      },
      fail: function (err) {
        console.error('接口调用失败:', err);
        wx.showToast({
          title: '提交失败',
          icon: 'none',
        });
      },
    });
  },
  register(){
    const { number, pwd,name } = this.data;
    wx.request({
      url: 'http://127.0.0.1:8080/register', 
      method: 'POST',
      data: {
        "telId": number, 
        "customerName": pwd, 
        "password": name
      },
      success: function (res) {
        console.log('接口调用成功:', res.data);
        if(res.data.code!=200){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          });
          return
        }
        wx.showToast({
          title: '提交成功',
          icon: 'success',
        });
        wx.redirectTo({
          url: '/pages/profile/profile',
        })
      },
      fail: function (err) {
        console.error('接口调用失败:', err);
        wx.showToast({
          title: '提交失败',
          icon: 'none',
        });
      },
    });
  },
  tabClick(e){
    let index = e.currentTarget.dataset.index
    if(index == 2) return
    if(index == 0){
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }else if(index == 1){
      wx.redirectTo({
        url: '/pages/cart/cart',
      })
    }else if(index == 2){
      wx.redirectTo({
        url: '/pages/profile/profile',
      })
    }
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
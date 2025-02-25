// pages/profile/profile.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navIndex: 2,
    auth: false,
    register: false,
  },
  toRegister(){
    this.setData({
      register: true
    })
  },
  toLogin(){
    this.setData({
      register: false
    })
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
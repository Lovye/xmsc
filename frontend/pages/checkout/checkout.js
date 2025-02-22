// pages/checkout/checkout.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addr: {},
    cart: [],
    goodsNum: 0,
    sumPrice: 0,
    payWay: -1,
  },
  changePayWay(e){
    this.setData({
      payWay: e.detail.value
    })
  },
  calculateCart(cart){
    let Num = 0
    let price = 0
    for(let i = 0; i < cart.length; i++){
      Num += cart[i].quantity
      price += cart[i].quantity * cart[i].goodsPrice
    }
    this.setData({
      goodsNum: Num,
      sumPrice: price
    })
  },
  continueShopping(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  pay(){
    let payWay = this.data.payWay
    if(payWay < 0 || payWay > 2){
      wx.showToast({
        title: '请选择支付方式',
        icon: 'error',
        duration: 1500,
      })
      return
    }
    // TODO 支付逻辑
    wx.showToast({
      title: '支付成功',
      icon: 'success',
      duration: 1500,
    })
    // 跳转回首页
    setTimeout(()=>{
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }, 1500)
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
    let cartData = wx.getStorageSync('cart')
    if(cartData != ''){
      this.setData({
        cart: cartData
      })
    }
    this.calculateCart(cartData)
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
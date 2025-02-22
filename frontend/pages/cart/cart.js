// pages/cart/cart.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navIndex: 1,
    cart: [],
    goodsNum: 0,
    sumPrice: 0,
  },
  removeGoods(e){
    let index = e.currentTarget.dataset.index
    let cart = this.data.cart
    if(index >= cart.length || index < 0) return
    let newCart = []
    for(let i = 0; i < cart.length; i++){
        if(i == index) continue
        newCart.push(cart[i])
    }
    this.setData({
      cart: newCart
    })
    wx.setStorageSync('cart', newCart)
    this.calculateCart(newCart)
  },
  toCheckout(){
    let auth = wx.getStorageSync('auth')
    if(auth){
      wx.redirectTo({
        url: '/pages/checkout/checkout',
      })
    }else{
      wx.redirectTo({
        url: '/pages/profile/profile',
      })
    }

  },
  tabClick(e){
    let index = e.currentTarget.dataset.index
    if(index == 1) return
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
// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {}
  },
  addCart(){
    let cart = wx.getStorageSync('cart')
    if(cart == ''){
      cart = []
      let item = {...this.data.goods}
      item['quantity'] = 1
      cart.push(item)
    }else{
      let targetIndex = -1
      for(let index = 0; index < cart.length; index++){
        const element = cart[index]
        if(element.goodsId == this.data.goods.goodsId){
          targetIndex = index
          break
        }
      }
      if(targetIndex == -1){
        let item = {...this.data.goods}
        item['quantity'] = 1
        cart.push(item)       
      }else{
        cart[targetIndex].quantity += 1
      }
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功！',
      duration: 1500
    })
  },
  seeCart(){
    wx.navigateTo({
      url: '/pages/cart/cart',
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
    this.setData({
      goods: wx.getStorageSync('goods')
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
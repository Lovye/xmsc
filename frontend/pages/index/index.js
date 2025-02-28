const domain = '127.0.0.1'
const port = 8080
const url = `http://${domain}:${port}`

Page({
  data: {
    goodsTypeArr: [],
    goodsType: {},
    goodsArr: [],
    navIndex: 0,
  },
  selectType(event){
    let index = event.target.dataset.index
    this.setData({
      goodsType: this.data.goodsTypeArr[index]
    })
    this.selectGoods()
  },
  selectGoods(){
    wx.request({
      url: `${url}/goods/${this.data.goodsType.goodsTypeId}`,
      method: 'get',
      success: (res) => {
        this.setData({
          goodsArr: res.data
        })
      }
    })
  },
  toGoods(e){
    let index = e.currentTarget.dataset.index
    // console.log(index)
    // return 
    wx.setStorageSync('goods', this.data.goodsArr[index])
    wx.redirectTo({
      url: `/pages/goods/goods`,
    })
  },
  tabClick(e){
    let index = e.currentTarget.dataset.index
    if(index == 0) return
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
  onShow(){
    wx.request({
      url: `${url}/goodsType`,
      method: 'get',
      success: (res) => {
        this.setData({
          goodsTypeArr: res.data,
          goodsType: res.data[0]
        })
        this.selectGoods()
      }
    })
  }
})
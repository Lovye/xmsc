# xmsc
微信小程序

## 前端说明

文件结构：

* cart对应购物车页面
* checkout对应结算页面，storage中auth字段不为空才能进入结算页面（也即登录后才能进入结算页）
* goods对应商品介绍页面
* index对应主页
* profile对应“我的”页面，auth默认为false（未登录）渲染登陆注册页，如果auth为true（登录）渲染个人页面（个人页面没啥功能，摆个样子）

接口注意事项

1. 登录
   
   找到登录按钮，加个事件监听发个请求完事了，登录成功后别忘记wx.setStorage一下，设置('auth', true)
   
   ```json
   // 请求体示例
   {
      "telId": 114 ,
      "password": "114"
   }
   ```

2. 注册

   找到注册按钮，点击一下进入注册页，找到注册页的注册按钮，添加事件监听发个请求就完事了

   ```json
   {
      "telId": 114, 
      "customerName": "张三", 
      "password": "114"
   }

   ```

3. 结算

   结算页面中cart是购物车数据，传给后端结算就行
   注意应当在请求头中放入:`auth={token}`
   ```json
   {
      "goodsInfos": [
          {
            "goodsId": 1,
            "quantity": 2
          },
          {
            "goodsId": 3,
            "quantity": 2
          }
      ],
      "addressId": 1
   }
   ```

   注意到这里需要一个addressId.地址信息这个东西我们会在结算前处理好。

   详情请见源代码


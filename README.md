# xmsc 微信小程序接口文档

## 前端说明

### 文件结构：

- **cart**: 购物车页面
- **checkout**: 结算页面，只有在 storage 中 `auth` 字段不为空时才能进入结算页面（即用户登录后才能进入结算页）
- **goods**: 商品介绍页面
- **index**: 主页
- **profile**: “我的”页面。`auth` 默认为 `false`（未登录）时渲染登录注册页，`auth` 为 `true`（已登录）时渲染个人页面（个人页面暂时没有太多功能，主要是展示）。

## 后端说明

### **登录**
   
   在登录页面找到登录按钮，添加事件监听，发送请求登录，成功后记得使用 `wx.setStorage` 设置 `auth: true`。
   
   请求体示例：
   ```json
   {
      "telId": 114,
      "password": "114"
   }
   ```

### **注册**
   
   在注册页面找到注册按钮，点击后进入注册页，添加事件监听发送请求完成注册。

   请求体示例：
   ```json
   {
      "telId": 114, 
      "customerName": "张三", 
      "password": "114"
   }
   ```



### **创建订单**

**接口**: `/purchase`  
**请求方式**: `POST`  
**认证方式**: 请求头中需要携带 Bearer Token。

#### **请求体**:
```json
{
    "goodsInfos": [
        {
            "goodsId": 1,    // 商品ID
            "quantity": 2    // 商品数量
        },
        {
            "goodsId": 3,    // 商品ID
            "quantity": 1    // 商品数量
        }
    ],
    "addressId": 1  // 地址ID
}
```

#### **响应体**:
```json
{
    "orderId": "string"  // 新创建的订单ID
}
```

#### **描述**:
此接口用于创建一个新的订单。用户需要提供有效的 Bearer Token，并在请求体中传入购买的商品信息和配送地址。接口会计算订单总金额，并根据商品信息、地址信息生成一个新的订单。

---

#### **错误码**:
- **401 Unauthorized**: 用户未认证，缺少或无效的 Bearer Token。

---



### **创建地址**

**接口**: `/address`  
**请求方式**: `POST`  
**认证方式**: 请求头中需要携带 Bearer Token。

#### **请求体**:
```json
{
    "address": "string"  // 要添加的地址（必填）
}
```

#### **响应体**:
```json
{
    "addressId": "string"  // 新创建的地址ID
}
```

#### **描述**:
此接口用于为已登录用户创建一个新的地址。用户需要提供有效的 Bearer Token。如果 Token 验证通过，将创建新地址并返回 `addressId`。

---

### **获取地址列表**

**接口**: `/address`  
**请求方式**: `GET`  
**认证方式**: 请求头中需要携带 Bearer Token。

#### **响应体**:
```json
{
    "addresses": [
        {
            "contactName": "string",   // 联系人姓名
            "contactTel": "string",    // 联系人电话
            "address": "string",       // 地址内容
            "telId": "string",         // 用户手机号ID
            "defaultState": "integer"  // 地址是否为默认地址，1 为默认，0 为非默认
        }
    ]
}
```

#### **描述**:
此接口用于获取当前用户的所有地址列表。用户需要提供有效的 Bearer Token。如果 Token 验证通过，将返回该用户的所有地址信息。

---

### **设置默认地址**

**接口**: `/address/default/:addressId`  
**请求方式**: `PUT`  
**认证方式**: 请求头中需要携带 Bearer Token。

#### **路径参数**:
- `addressId`: 要设置为默认地址的地址ID。

#### **响应体**:
- `Status 200`: 默认地址设置成功。
- `Status 401`: 用户未认证（Token 缺失或无效）。
- `Status 402`: 该地址属于其他用户，无法设置为默认。

#### **描述**:
此接口用于将指定地址设置为当前用户的默认地址。只有属于当前用户的地址才能被设置为默认地址。如果用户未认证或试图设置其他用户的地址为默认地址，将返回错误信息。

---

### **错误码**:
- **401 Unauthorized**: 用户未认证，缺少或无效的 Bearer Token。
- **402 Forbidden**: 用户尝试修改不属于自己的地址。

---

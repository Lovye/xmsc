const execute = require('../databse');  // 引入封装的数据库执行函数

module.exports = {
  // 通过手机号查询用户
  findByTel: async (telId) => {
    const sql = 'SELECT * FROM customer WHERE telId = ?';
    const result = await execute(sql, [telId]);
    return result[0];  // 返回查询到的用户信息
  },

  // 创建新用户
  create: async (userData) => {
    const { telId, customerName, password } = userData;
    const sql = 'INSERT INTO customer (telId, customerName, password) VALUES (?, ?, ?)';
    const result = await execute(sql, [telId, customerName, password]);
    return { telId, customerName, password };  // 返回插入的用户数据
  }
};

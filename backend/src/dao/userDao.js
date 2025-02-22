const pool = require('../database');

module.exports = {
  // 通过手机号查询用户
  findByTel: async (tel) => {
    const [rows] = await pool.query(
      'SELECT * FROM customer WHERE telId = ?',
      [tel]
    );
    return rows[0];
  }
};
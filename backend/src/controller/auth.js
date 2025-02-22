const jwt = require('jsonwebtoken');
const userDao = require('../dao/userDao');
const { sign } = require('../utils/jwt');

module.exports = {
  login: async (ctx) => {
    try {
      const { telId, password } = ctx.request.body;
      
      // 参数校验
      if (!telId || !password) {
        ctx.throw(400, '手机号和密码不能为空');
      }

      // 查询用户
      const user = await userDao.findByTel(telId);
      if (!user) {
        ctx.throw(404, '用户不存在');
      }

      // 密码验证（当前为明文验证）
      if (password !== user.password) {
        ctx.throw(401, '密码错误');
      }

      // 生成Token（排除密码字段）
      const { password: _, ...userData } = user;
      const token = sign(userData);
      
      ctx.body = {
        code: 200,
        data: {
          token,
          user: userData
        },
        msg: '登录成功'
      };

    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = {
        code: ctx.status,
        msg: err.message || '服务器错误'
      };
    }
  }
};
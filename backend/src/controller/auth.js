const jwt = require('jsonwebtoken');
const userDao = require('../dao/userDao');
const { sign } = require('../utils/jwt');

// 登录逻辑
module.exports = {
  login: async (ctx) => {
    try {
      // 获取请求参数
      const { telId, password } = ctx.request.body;

      // 参数校验
      if (!telId || !password) {
        ctx.throw(400, '手机号和密码不能为空');
      }

      // 根据手机号查询用户
      const user = await userDao.findByTel(telId);
      if (!user) {
        ctx.throw(401, '用户不存在或密码错误'); // 统一为 401，避免泄露太多信息
      }
      // 查看用户信息（开发环境）
      // console.log(user)

      // 密码验证（当前为明文验证）
      if (toString(password) !== toString(user.password)) {
        ctx.throw(401, '用户不存在或密码错误');
      }

      // 生成Token（排除密码字段）
      const { password: _, ...userData } = user;
      const token = sign(userData);

      // 响应登录成功
      ctx.body = {
        code: 200,
        data: {
          token,  // Token 用于后续认证
          user: userData // 用户信息（不含密码）
        },
        msg: '登录成功'
      };

    } catch (err) {
      // 错误处理
      const statusCode = err.status || 500;
      const errorMessage = err.message || '服务器错误';

      // 打印错误日志（开发环境）
      // console.error(`登录失败: ${errorMessage}`, err);

      // 回复客户端
      ctx.status = statusCode;
      ctx.body = {
        code: statusCode,
        msg: errorMessage
      };
    }
  }
};
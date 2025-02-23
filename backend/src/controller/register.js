const userDao = require('../dao/userDao');  // 引入 userDao

module.exports = {
    // 注册方法
    register: async (ctx) => {
        try {
            // 获取请求体中的手机号、用户名和密码
            const { telId, customerName, password } = ctx.request.body;

            // 参数校验
            if (!telId || !customerName || !password) {
                ctx.throw(400, '手机号、用户名和密码不能为空');
            }

            // 检查用户是否已存在
            const existingUser = await userDao.findByTel(telId);
            if (existingUser) {
                ctx.throw(400, '用户已存在');
            }

            // 创建新用户
            const newUser = {
                telId,
                customerName,
                password, // 当前为明文密码，生产环境应加密处理
            };

            // 插入新用户到数据库
            const createdUser = await userDao.create(newUser);

            // 返回注册成功的响应
            const { password: _, ...userData } = createdUser;

            ctx.body = {
                code: 200,
                data: {
                    user: userData
                },
                msg: '注册成功'
            };

        } catch (err) {
            // 捕获错误，返回错误信息
            ctx.status = err.status || 500;
            ctx.body = {
                code: ctx.status,
                msg: err.message || '服务器错误'
            };
        }
    }
};

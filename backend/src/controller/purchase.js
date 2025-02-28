const goodsDao = require('../dao/goodsDao');
const orderDao = require('../dao/orderDao');
const { design } = require('../utils/jwt');

module.exports = {
    purchase: async (ctx) => {
        const { goodsInfos, addressId } = ctx.request.body;
        const token = ctx.request.headers.auth || '';
        if (!token) {
            ctx.status = 401;
            return;
        }
        let telId = design(token).telId;
        let orderTotal = 0;
        for (let i = 0; i < goodsInfos.length; i++) {
            let goodsInfo = goodsInfos[i];
            let tmp =  await goodsDao.selectGoodsByGoodsId(goodsInfo.goodsId);
            orderTotal += tmp.goodsPrice * goodsInfo.quantity;
        }
        let orderDate = new Date();
        let orderId = orderDate.getMilliseconds();

        let newOrder = {
            telId,
            orderDate,
            orderTotal,
            addressId,
            orderId
        };
        await orderDao.create(newOrder);
        ctx.status = 200;
        ctx.body = {
            orderId
        }
    }
}
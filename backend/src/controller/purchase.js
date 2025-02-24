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
        let orderTotal = goodsInfos
            .map(goodsInfo => goodsDao.selectGoodsByTypeId(goodsInfo.goodsId).goodsPrice * goodsInfo.quantity)
            .reduce((acc, price) => acc + price, 0);
        let orderDate = new Date();

        let newOrder = {
            telId,
            orderDate,
            orderTotal,
            addressId
        };
        let orderId = orderDao.create(newOrder);
        ctx.status = 200;
        ctx.body = {
            orderId
        }
    }
}
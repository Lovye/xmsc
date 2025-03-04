const userDao = require('../dao/userDao');
const addressDao = require('../dao/addressDao');
const { design } = require('../utils/jwt');

module.exports = {

    create: async (ctx) => {
        const { address } = ctx.request.body;
        const token = ctx.request.headers.auth || '';
        if (!token) {
            ctx.status = 401;
            return;
        }
        if (!address) {
            ctx.status = 400;
            ctx.body = {
                error: '地址不能为空'
            };
            return;
        }

        let decoded = design(token);

        let telId = decoded.telId;
        let contactName = decoded.customerName;
        let contactTel = telId;
        let defaultState = 0;

        let newAddress = {
            contactName,
            contactTel,
            address,
            telId,
            defaultState
        };
        let addressId = await addressDao.create(newAddress);
        ctx.status = 200;
        ctx.body = {
            addressId
        }
    },

    get: async (ctx) => {
        const token = ctx.request.headers.auth || '';
        if (!token) {
            ctx.status = 401;
            return;
        }

        let telId = design(token).telId;
        let addresses = await addressDao.selectByTelId(telId);

        ctx.status = 200;
        ctx.body = {
            addresses
        }
    },

    setDefault: async (ctx) => {
        const token = ctx.request.headers.auth || '';
        if (!token) {
            ctx.status = 401;
            return;
        }
        let telId = design(token).telId;

        let targetAddressId = ctx.params.addressId;
        let address = await addressDao.selectByAddressId(targetAddressId);
        if (address.telId != telId) {
            ctx.status = 402;
            return;
        }

        let allAddress = await addressDao.selectByTelId(telId);
        let allAddressId = allAddress.map(x => x.addressId)
                    .filter(x => x != targetAddressId)

        await Promise.all(allAddressId.map(async addressId => {
            await addressDao.setDefaultStateByAddressId(0, addressId);
        }));
        await addressDao.setDefaultStateByAddressId(1, targetAddressId);
        ctx.status = 200;
        ctx.body = {
            msg: "设置成功"
        }
    }

}
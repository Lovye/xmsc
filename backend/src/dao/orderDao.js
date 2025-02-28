const execute = require('../database');

let dao = {}

dao.create = async (order) => {
    const { telId, orderDate, orderTotal, addressId, orderId } = order;
    let sql = 'INSERT INTO orders (telId, orderDate, orderTotal, addressId, orderId) VALUES (?, ?, ?, ?, ?)';
    let result = await execute(sql, [telId, orderDate, orderTotal, addressId, orderId]);
    return result;
}

module.exports = dao
const execute = require('../database');

let dao = {}

dao.create = async (order) => {
    const { telId, orderDate, orderTotal, addressId } = order;
    let sql = 'INSERT INTO orders (telId, orderDate, orderTotal, addressId) VALUES (?, ?, ?, ?)';
    let result = await execute(sql, [telId, orderDate, orderTotal, addressId]);
    return result.insertId;
}

module.exports = dao
const execute = require('../database');

let dao = {};

dao.create = async (data) => {
    const { contactName, contactTel, address, telId, defaultState } = data;
    let sql = 'INSERT INTO address (contactName, contactTel, address, telId, defaultState) VALUES (?, ?, ?, ?, ?)';
    let result = await execute(sql, [contactName, contactTel, address, telId, defaultState]);
    return result.insertId;
}

dao.selectByTelId = async (telId) => {
    let sql = 'SELECT * FROM address WHERE telId = ?';
    let result = await execute(sql, [telId]);
    return result;
}

dao.selectByAddressId = async (addressId) => {
    let sql = 'SELECT * FROM address WHERE addressId = ?';
    let result = await execute(sql, [addressId]);
    return result[0];
}

dao.setDefaultStateByAddressId = async (defaultState, addressId) => {
    let sql = 'UPDATE address SET defaultState = ? WHERE addressId = ?';
    await execute(sql, [defaultState, addressId]);
}

module.exports = dao;
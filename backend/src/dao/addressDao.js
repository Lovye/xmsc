const execute = require('../database');

let dao = {}

dao.create = async (data) => {
    const { contactName, contactTel, address, telId, defaultState } = data;
    let sql = 'INSERT INTO orders (contactName, contactTel, address, telId, defaultState) VALUES (?, ?, ?, ?, ?)';
    let result = await execute(sql, [contactName, contactTel, address, telId, defaultState]);
    return result.insertId;
}

dao.selectByTelId = async (telId) => {
    let sql = 'SELECT * FROM address WHERE telId = ?';
    let result = await execute(sql, [telId]);
    return result;
}

module.exports = dao
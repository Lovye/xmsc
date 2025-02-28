const execute = require('../database')

let dao = {}

dao.selectGoodsByTypeId = async (typeId) => {
    let sql = 'select * from goods where goodsTypeId = ?'
    let result = null
    await execute(sql, [typeId]).then(res => { result = res })
    return result
}

dao.selectGoodsByGoodsId = async (goodsId) => {
    let sql = 'select * from goods where goodsId = ?'
    let result = null
    await execute(sql, [goodsId]).then(res => { result = res })
    return result[0]
}

module.exports = dao
const execute = require('../databse')

let dao = {}

dao.selectGoodsByTypeId = async (typeId)=> {
    let sql = 'select * from goods where goodsTypeId = ?'
    let result = null
    await execute(sql, [typeId]).then( res => {result = res})
    return result
}

module.exports = dao
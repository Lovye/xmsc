const execute = require('../databse')

let dao = {}

dao.selectAllGoodsType = async ()=> {
    let sql = 'select * from goodstype'
    let result = null
    await execute(sql, []).then(res => { result = res })
    return result
}

module.exports = dao
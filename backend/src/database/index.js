const mysql = require('mysql')
const config = require('./config.json')

// 封装一个执行sql语句的函数
const execute = (sql, values) => {
    return new Promise((resolve, reject) => {
        let connection = mysql.createConnection(config)
        connection.connect()
        connection.query(sql, values, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
        connection.end()
    })
}

module.exports = execute
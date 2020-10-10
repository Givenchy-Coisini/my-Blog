const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

//创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

//todo 开始链接
con.connect()

//统一执行mysql语句  封装sql函数
function exec(sql) {
    //异步的 封装成promise
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {//单例模式
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise

}

module.exports = {
    exec,
    escape:mysql.escape
}
const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    //因为 author 和 keyword值不确定 所以要有1=1
    if (author) {
        sql += `and author ='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    //返回promise
    return exec(sql)
}
const getDetail = (id) => {
    let sql = `select * from blogs where id=${id} `
    return exec(sql).then(rows => {
        return rows[0]
    })
}
const newBlog = (blogData = {}) => {
    console.log('data...', blogData)
    const id = blogData.id
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createtime = Date.now()
    let sql = `insert into blogs (id,title,content,createtime,author) values (${id},'${title}','${content}','${createtime}','${author}') `
    return exec(sql).then(insertData => {
        // console.log(insertData)
        return {
            id: id
        }
    })
}
const updateBlog = (id, blogData = {}) => {
    const { title, content } = blogData
    const sql = `
    update blogs set title ='${title}',content='${content}' where id=${id}
    `
    return exec(sql).then(updateData=>{
        console.log(updateData)
        if(updateData.affectedRows>0){
            return true
        }
        return false
    })
}
const delBlog = (id,author) => {
    const sql = `
    delete from blogs where id ='${id}' and author='${author}'
    `
    return exec(sql).then(deleteData=>{
        console.log(deleteData)
        if(deleteData.affectedRows>0){
            return true
        }
        return false
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
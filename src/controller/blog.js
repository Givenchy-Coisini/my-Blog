const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: 'biaoti1',
            content: 'neirong1',
            creteTime: 1566610491112,
            author: 'zhangsna'
        },
        {
            id: 2,
            title: 'biaoti2',
            content: 'neirong2',
            creteTime: 1566610491112,
            author: 'lisi'
        }
    ]
}
const getDetail = (id) => {
    return {
        id: 1,
        title: 'biaoti1',
        content: 'neirong1',
        creteTime: 1566610491112,
        author: 'zhangsna'

    }
}
const newBlog = (blogData = {}) => {
    console.log('data...',blogData)
    return {
        id: 3
    }
}
const updateBlog = (id,blogData={})=>{
   console.log('updatedata',id,blogData)
    return true
}
const delBlog =(id)=>{
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
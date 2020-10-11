const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const express = require('express')

const router = express.Router()

router.get('/list', (req, res, next) => {
    let author = req.query.author || ``
    const keyword = req.query.keyword || ``
  
    // if (req.query.isadmin) {
    //     //管理员界面
    //     const loginCheckResult = loginCheck(req)
    //     if (loginCheckResult) {
    //         //未登录
    //         return loginCheckResult
    //     }
    //     //强行查询自己的博客
    //     author = req.session.username
    // }
    const result = getList(author, keyword)
    return result.then(listData => {
       res.json( new SuccessModel(listData))
    })
})

module.exports = router
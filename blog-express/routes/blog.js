const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const express = require('express')

const router = express.Router()

router.get('/list', (req, res, next) => {
    let author = req.query.author || ``
    const keyword = req.query.keyword || ``

    if (req.query.isadmin) {
        console.log('is admin')
        //管理员界面
        if (req.session.username === null) {
            //未登录
            console.error('is admin but not login')
            res.json(new ErrorModel('未登录'))
            return
        }
        //强行查询自己的博客
        author = req.session.username
    }
    const result = getList(author, keyword)
    return result.then(listData => {
        res.json(new SuccessModel(listData))
    })
})

router.get('/detail', (req, res, next) => {
    const result = getDetail(req.query.id)
    return result.then(data => {
        res.json(new SuccessModel(data))
    })
})

router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(new SuccessModel(data))
    })
})
router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.body.id, req.body)
    return result.then(val => {
        if (val) {
            res.json(new SuccessModel())
            return
        } else {
            res.json(new ErrorModel('更新博客失败'))
        }
    })
})

router.post('/del', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const result = delBlog(req.query.id, author);
    return result.then(val => {
        if (val) {
            res.json(new SuccessModel()) 
        } else {
            res.json(new ErrorModel('删除博客失败')) 
        }
    })
})
module.exports = router
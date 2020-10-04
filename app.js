const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')

const getPostData = (req) => {
    return new Promise((reslove, reject) => {
        if (req.method !== 'POST') {
            reslove({ 222: 222 })
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            reslove({ 111: 111 })
            return
        }
        let postData = ""
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                reslove({ 123: 123 })
                return
            }
            reslove(
                JSON.parse(postData)
            )
        })
    })
}
const serverHandle = ((req, res) => {
    //设置返回格式 json
    res.setHeader('Content-type', 'application/json')
    //获取url
    const url = req.url
    req.path = url.split('?')[0]
    //解析query
    req.query = querystring.parse(url.split('?')[1])
    //todo  解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '' //k1=v1;k2=v2;k3=v3;
    //处理postData   异步
    getPostData(req).then(postData => {
        req.body = postData
        //处理blog路由
        // const blogData = handleBlogRouter(req, res)
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        //处理user路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        //未命中路由返回404
        res.writeHead(404, { "Content-type": "text/plain" })
        res.write("404 Not Found\n")
        res.end()
    })

})
module.exports = serverHandle
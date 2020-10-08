const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { get, set } = require('./src/db/redis')
const { access } = require('./src/utils/log')
const querystring = require('querystring')

//获取cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}
//session数据
const SESSION_DATA = {}
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
    //记录access log
    access(`
    ${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}
    `)

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
    cookieStr.split(';').forEach(item => {
        if (!item) {//split用于将字符串分隔成字符串数组
            return
        }
        const arr = item.split('=')//在等号那里分开
        const key = arr[0].trim()
        const val = arr[1].trim()//? 去掉空格
        req.cookie[key] = val
    })
    console.log('xxxx', req.cookie)

    //? 解析session
    let userId = req.cookie.userid
    let needSetCookie = false
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    //处理postData   异步
    getPostData(req).then(postData => {
        req.body = postData
        //处理blog路由
        // const blogData = handleBlogRouter(req, res)
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    //操作cookie
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/ httpOnly expiers=${getCookieExpires()}`)
                    //httpOnly   是确保不能在浏览器中修改cookie
                }
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
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/ httpOnly expiers=${getCookieExpires()}`)
                }
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
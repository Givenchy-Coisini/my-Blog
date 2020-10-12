const router = require('koa-router')()//koa-router插件是独立于koa2的

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {//ctx 就是req,res的结合体
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router

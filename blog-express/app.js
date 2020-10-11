var createError = require('http-errors');//404 友好错误
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');//解析cookie
var logger = require('morgan');//自动生成日志

const session = require('express-session')
const RedisStore = require('connect-redis')(session)

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client:redisClient
})

//todo解析session
app.use(session({
  secret:'Wj1010_2000!',
  cookie:{
    path:'/',//默认配置
    httpOnly:true,//默认配置
    maxAge:24*60*60*1000
  },
  store:sessionStore
}))
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog',blogRouter)
app.use('/api/user',userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

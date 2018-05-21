var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");




var multer = require('multer')
var uploadFiles = multer({dest:'./files'});//最简单的写法

var storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./files')//如果destination是一个函数，则目标目录需要自己手动创建
  },
  filename:function (req,file,cb) {
    cb(null,file.fieldname + '-' + Date.now())
  }
})

var uploadFiles2 = multer({storage})
/*
  处理文件上传的插件：multer ,前端的form表格需要增加属性 enctype = multipart/form-data
  form-data表示有文件类型的表单
* */




require('babel-register');//es6 babel
// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index')
var jsonParser = bodyParser.json()
var urlencode = bodyParser.urlencoded({extended:false})
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded






app.all('*', function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

/*
  设置CORS
 */



/*
  应用级中间件，应用级的中间会匹配多个中间件，而路由级中间件只会匹配一个中间件
 */
app.use('/abc/login',urlencode,function(req,res,next) {
  /*
    req.body获得请求体
   */
  console.log("app use login")
  next()
})
app.use('/abc', indexRouter);






/*
  处理文件上传的中间件
*/
app.post('/upload',uploadFiles2.array('filename'),function (req,res,next) {

  console.log(req.files)
  console.log(req.body)
  res.send(req.files)
})


/*
  中间件
 */

app.use(function (req,res,next) {
  console.log("before next")
  next()
  console.log("after next") //会等到下一个中间件结束完再继续执行
})

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
/*
  静态文件中间件，静态文件目录，可以通过http://localhost:3000/静态文件名 直接反问
* */






app.use('/users/:id', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var db = mongoose.connect("mongodb://PengKen:123123110a@ds229690.mlab.com:29690/mongotest");
var Schema = new mongoose.Schema
var objectId =  Schema.objectId
console.log(objectId)
var TestSchema = new mongoose.Schema({
  name : { type:String },//属性name,类型为String
  age  : { type:Number, default:0 },//属性age,类型为Number,默认为0
  time : { type:Date, default:Date.now },
  email: { type:String,default:''}
});
var TestModel = mongoose.model("test1", TestSchema);//创建一个schema的模型，test1是一个数据库中一个集合的名称
TestModel({name:'fuck'}).save(function () {
  console.log(arguments)
})
module.exports = app;

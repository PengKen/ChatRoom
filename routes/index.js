var express = require('express');
var router = express.Router();

/* GET home page. */
console.log("before login")
router.get('/login', function(req, res, next) {
  console.log("123")
  // res.send("123")
});

router.get('/login/aaa', function(req, res, next) {
  console.log("aaa")
  res.send("aaa")
  next()//这里的next直接跳到下一个应用级中间件
});
module.exports = router;

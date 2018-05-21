var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("abcAs")
  res.send({a:1});
  next()
});

module.exports = router;

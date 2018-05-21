var mysql = require('mysql')
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'123',
  database:'chat'
})
connection.connect();

function select(sql) {
  console.log("in sql")
  connection.query("select * from user",function (err,rows,fields) {
    console.log(fields)
  })
}
exports.select = select;
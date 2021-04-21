const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'pxukqohrckdfo4ty.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'xuvwzq6wygw6t2gv',
    password: 'znabbsq170mffx5r',
    database: 'hprxc6b8d6lbq5gf'
})

module.exports = db;
var express = require('express');
var router = express.Router();
var mysql = require('../db/db');

/* GET home page. */
router.get('/list', function(req, res, next) {
    let sql = 'SELECT * FROM random_people';
    mysql.query(sql, function (err, data, fields){
        if(err) throw err;
        res.json({
            status: 200,
            data,
            message: "User lists retrieved successfully"
        })
    })
    // https://dev.to/nurofsun/building-simple-rest-api-with-express-js-and-mysql-140p
});

module.exports = router;

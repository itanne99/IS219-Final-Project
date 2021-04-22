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

router.post('/new', function (req, res){
   let sql = "INSERT INTO random_people (first_name, last_name, email, phone, street_address, city, state) VALUES (?)";
   let values = [
       req.body.first_name,
       req.body.last_name,
       req.body.email,
       req.body.phone,
       req.body.street_address,
       req.body.city,
       req.body.state
   ];
   mysql.query(sql, [values], function (err, data, fields){
      if(err) throw err;
      res.json({
          status: 200,
          message: "New user add successfully"
      })
   });
});

module.exports = router;

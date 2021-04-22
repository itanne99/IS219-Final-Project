var express = require('express');
var router = express.Router();
var mysql = require('../db/db');

/* GET home page. */
router.get('/list', function(req, res) {
    let sql = 'SELECT * FROM random_people';
    mysql.query(sql, function (err, data, fields){
        if(err) throw err;
        res.json({
            status: 200,
            data,
            message: "User lists retrieved successfully"
        })
    })
});

router.get("/person/:id", function (req, res){
    let sql = "SELECT * FROM random_people WHERE id="+req.params.id;
    mysql.query(sql, function (err, data, fields){
        if(err) throw err;
        res.json({
            status: 200,
            data,
            message: "User lists retrieved successfully"
        })
    })
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

router.put('/edit/:id', function (req, res){
    let values = [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.phone,
        req.body.street_address,
        req.body.city,
        req.body.state
    ];
    let sql = "UPDATE random_people SET first_name='"+values[0]+"' , last_name='"+values[1]+"' , email='"+values[2]+"' , phone='"+values[3]+"' , street_address='"+values[4]+"' , city='"+values[5]+"' , state='"+values[6]+"' WHERE id="+req.params.id;
    mysql.query(sql, function (err, data, fields){
        if(err) throw err;
        res.json({
            status: 200,
            message: "Updated user @ "+ req.params.id +" successfully"
        })
    });
})

module.exports = router;

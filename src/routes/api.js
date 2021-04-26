var express = require('express');
var mysql = require('../db/db');

var router = express.Router();

/* GET home page. */
router.get('/list', function (req, res) {
    const sql = 'SELECT * FROM random_people';
    mysql.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data);
    });
});

router.get('/person/:id', function (req, res) {
    const sql = 'SELECT * FROM random_people WHERE id=?';
    mysql.query(sql, req.params.id, function (err, data, fields) {
        if (err) throw err;
        res.json({
            data,
        });
    });
});

router.post('/new', function (req, res) {
   const sql = 'INSERT INTO random_people (first_name, last_name, email, phone, street_address, city, state) VALUES (?)';
   const values = [
       req.body.first_name,
       req.body.last_name,
       req.body.email,
       req.body.phone,
       req.body.street_address,
       req.body.city,
       req.body.state,
   ];
   mysql.query(sql, [values], function (err, data, fields) {
      if (err) throw err;
      res.json({
          status: 200,
          message: 'New user add successfully',
      });
   });
});

router.put('/edit/:id', function (req, res) {
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.phone,
        req.body.street_address,
        req.body.city,
        req.body.state,
    ];
    const sql = 'UPDATE random_people SET first_name=?, last_name=?, email=?, phone=?, street_address=?, city=?, state=? WHERE id=?';
    mysql.query(sql, [values, req.params.id], function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: `Updated user @ ${req.params.id} successfully`,
        });
    });
});

module.exports = router;

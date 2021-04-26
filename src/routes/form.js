var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('newUser', { title: 'New User Form' });
});

router.get('/:id', function (req, res, next) {

});

module.exports = router;

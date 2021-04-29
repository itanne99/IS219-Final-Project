var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.render('userPortal', { title: 'Login Portal', mode: 'login' });
});

router.post('/login', function (req, res, next) {
  // Login user
});

router.get('/register', function (req, res, next) {
  res.render('userPortal', { title: 'Register Portal', mode: 'register' });
});

router.post('/register', function (req, res, next) {
  // Register user
});

module.exports = router;

var express = require('express');
var got = require('got');

var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    if (req.user) {
        if (req.query.id == null) {
            const body = await got.get('http://localhost:3000/api/list');
            const data = JSON.parse(body.body);
            res.render('tableView', { title: 'Table View', list: data });
        } else {
            const body = await got.get(`http://localhost:3000/api/person?id=${req.query.id}`);
            const data = JSON.parse(body.body);
            res.render('tableView', { title: 'Table View', list: data });
        }
    } else {
        res.render('login', {
            message: 'Please login to continue',
            messageClass: 'alert-danger',
        });
    }
});

module.exports = router;

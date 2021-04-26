var express = require('express');
var got = require('got');

var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    const body = await got.get('http://localhost:3000/api/list');
    const data = JSON.parse(body.body);
    res.render('tableView', { title: 'Table View', list: data });
});

router.get('/person/:id', async (req, res, next) => {
    const body = await got.get(`http://localhost:3000/api/person/${req.params.id}`);
    const data = JSON.parse(body.body);
    res.render('tableView', { title: 'Table View', list: data });
});

module.exports = router;

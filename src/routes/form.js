const express = require('express');
const got = require('got');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
    if (req.query.id == null) {
        res.render('newUser', { title: 'New User Form' });
    } else {
        const body = await got.get(`http://localhost:3000/api/person?id=${req.query.id}`);
        const data = JSON.parse(body.body);
        res.render('editUser', { title: 'Edit User Form', list: data });
    }
});

module.exports = router;

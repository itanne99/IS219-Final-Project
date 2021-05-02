const express = require('express');
const authenticationToken = require('./auth').authenticationToken;
const router = express.Router();

const posts = [
  {
    username: 'Ido',
    title: 'Post 1'
  },
  {
    username: 'Jane',
    title: 'Post 2'
  },
]

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/posts', authenticationToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name ));
});

module.exports = router;

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated ? 'Logged in' : 'Logged out');
});

router.get('/profile', (req, res) => {
    if (req.oidc.isAuthenticated) {
        res.send(JSON.stringify(req.oidc.user));
    }
});

module.exports = router;

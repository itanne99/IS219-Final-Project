const express = require('express');
require('dotenv').config();
const { auth } = require('express-openid-connect');

const router = express.Router();

const config = {
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
};

router.use(auth(config));

router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/profile', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.send(JSON.stringify(req.oidc.user));
    }
});

module.exports = router;

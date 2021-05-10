const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const webpack = require('webpack');
const config = require('../config/webpack.dev');
const cookieSession = require('cookie-session');
// const jwt = require('express-jwt');
// const jwtAuthz = require('express-jwt-authz');
// const jwksRsa = require('jwks-rsa');
require('dotenv').config();
const { auth } = require('express-openid-connect');

const compile = webpack(config);
const webpackHotMiddleware = require('webpack-hot-middleware')(compile);
const webpackDevMiddleware = require('webpack-dev-middleware')(compile, config.devServer);

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const formRouter = require('./routes/form');
const tableRouter = require('./routes/table');
const authRouter = require('./routes/auth');

const app = express();

app.use(webpackDevMiddleware);
app.use(webpackHotMiddleware);

const authConfig = {
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
};

/* const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.ISSUER_BASE_URL}/.well-known/jwks.json`,
    }),

    // Validate the audience and the issuer.
    audience: `${process.env.BASE_URL}/callback`,
    issuer: [process.env.ISSUER_BASE_URL],
    algorithms: ['RS256'],
}); */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(
    cookieSession({
        name: '__session',
        keys: ['key1'],
        maxAge: 24 * 60 * 60 * 100,
        secure: true,
        httpOnly: true,
        sameSite: 'none',
    }),
);

app.use(auth(authConfig));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/form', formRouter);
app.use('/table', tableRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

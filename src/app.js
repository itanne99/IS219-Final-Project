const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const webpack = require('webpack');
const config = require('../config/webpack.dev');

const compile = webpack(config);
const webpackHotMiddleware = require('webpack-hot-middleware')(compile);
const webpackDevMiddleware = require('webpack-dev-middleware')(compile, config.devServer);

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const formRouter = require('./routes/form');
const tableRouter = require('./routes/table');

const app = express();

app.use(webpackDevMiddleware);
app.use(webpackHotMiddleware);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/form', formRouter);
app.use('/table', tableRouter);

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

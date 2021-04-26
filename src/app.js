var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var formRouter = require('./routes/form');
var tableRouter = require('./routes/table');

var app = express();

const webpack = require("webpack")
const config = require("../config/webpack.dev")
const compile = webpack(config)

const webpackDevMiddleware = require("webpack-dev-middleware")(compile, config.devServer);
const webpackHotMiddleware = require("webpack-hot-middleware")(compile);

app.use(webpackDevMiddleware);
app.use(webpackHotMiddleware);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/form', formRouter);
app.use('/table', tableRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

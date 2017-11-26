var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var dataRoutes = require('./routes/dataRoutes')
var userRoutes = require('./routes/userRoutes')
const passport = require('passport')
const session = require('express-session')
const hbs = require('hbs')
const collectionRoutes = require('./routes/CollectionsRoutes')

// view engine setup
//todo, partials?
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session()) // Obtem da sessão user id -> deserialize(id) -> user -> req.user

app.use( dataRoutes);
app.use( userRoutes);
app.use(collectionRoutes);
var partial = require('express-partial');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(partial());
// // catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
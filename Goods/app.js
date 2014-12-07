var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var multer = require('multer');
var mongoose = require('mongoose')
var session = require('express-session');
var mongoStore = require('connect-mongo')(session); 
var bson = require('bson');
var fs = require('fs')
var dbUrl = 'mongodb://localhost:27017/Goods'

mongoose.connect(dbUrl)

var app = express();
var models_path = __dirname + '/app/models'
var walk = function(path) {
  fs.readdirSync(path)
    .forEach(function(file) {
      var newPath = path + '/' + file
      var stat = fs.statSync(newPath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(newPath)
        }
      }
      else if (stat.isDirectory()) {
        walk(newPath)
      }
    })
}
walk(models_path)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());  
app.use(multer());  
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'Goods',
  resave: true,
  saveUninitialized: true,
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  }),
  cookie:{
    expires:new Date(Date.now() + 3600000),
    maxAge:1000*60*30
  }
}))


app.use(require('./routes/router'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

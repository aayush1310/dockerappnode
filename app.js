var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var cron = require('node-cron');
var bodyParser = require('body-parser')

mongoose.connect('mongodb://mongo:27017/users', function (err) {
  if (err) {
    return console.log(err);
  }
  return console.log("Successfully Connected to MongoDB");
})

var index = require('./routes/index');
var london = require('./routes/london');
var newyork = require('./routes/newyork');
var paris = require('./routes/paris');
var tokyo = require('./routes/tokyo');
var appetizers = require('./routes/appetizers');
var login = require('./routes/login');
var register = require('./routes/register');
var updateProfile = require('./routes/updateProfile');
var logout = require('./routes/logout');
var User = require('./Model/User');
var adminRegister = require('./routes/adminRegister');

var app = express();

// app.locals.data = login.firstname;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "qwg4er65g47erbger89b", cookie: {
    maxAge: 30 * 60 * 1000
  }, rolling: true, resave: false, saveUninitialized: true
}))

app.use('/', index);
app.use('/london', london);
app.use('/newyork', newyork);
app.use('/paris', paris);
app.use('/tokyo', tokyo);
app.use('/login', login);
app.use('/register', register);
app.use('/appetizers', appetizers);
app.use('/updates', updateProfile);
app.use('/logout', logout);
app.use('/adminRegister', adminRegister);

app.disable('view cache');

// app.use(function (req, res, next) {
//   res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//   next();
// });

// app.use(function(req, res, next) {
//   res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//   next();
// });


// app.use('/:id',function(req, res, next){
//   res.end('Displaying information for uid ' + req.params.id);
// });
// app.use('/:id',function(req, res, next){
//     res.render('views/appetizers.ejs', { 
//     title: 'Appetite',
//     jsondata: data,
//     id: req.params.id 
//   });
// });

var task = cron.schedule('* * * * *', function () {
  console.log('running a task every minute');
  User.find(function (err, user) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (!user) {
      // return res.sendStatus(404);
      res.send("Authentication failure");
      console.log("User not found");
    }
    if (user) {
      console.log("total User"+user.length);
      for (i = 0; i < user.length; i++) {
        console.log(user[i].date);
        var username = user[i].username;
        var minutes = (((new Date() - user[i].date) / 1000) / 60);
        if (minutes > 360) {
          console.log("35 minutes over for " + username);
          User.update(
            {username:username},
            {
              $unset: {token:1},
              $unset: {date:1}
            },
            {multi:true}, function (err, user) {
              if(err){
                console.log(err);
              }
              else{
                console.log("token Updated");
              }
            });
        }
      }
      // console.log(user[0].date);
      // var day = (((((new Date() - user[0].date) / 1000) / 60) / 60) / 24);
      // console.log("Days :" + day);
      // var minutes = (((new Date() - user[0].date) / 1000) / 60);
      // console.log("minutes :" + minutes);
      // if (minutes > 35) {
      //   console.log("35 minutes over");

      // }
    }
  });
});

task.start();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error' + err);
});

module.exports = app;

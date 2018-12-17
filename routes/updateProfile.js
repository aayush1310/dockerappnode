var express = require('express');
var router = express.Router();
var User = require('../Model/User');
var checkAuth = require('../controller/check-auth');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("Update");
  // res.send("Update");
  console.log("Inside Update",req.session.user)
  if (!req.session.user) {
    res.redirect('/login')
  } else {
    res.render('updatePage', { title: 'UpdateProfile', userdetails: req.session.user});
  }
});

router.post('/updateProfiles',checkAuth, function (req, res, next) {
  try {
    // res.send("body");
    // res.header('Cache-Control', 'no-cache');
    // res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');
    console.log("Inside UpdateProfile",req.session.user);
    if(!req.session.user){
      res.redirect('/login');
    } else {
      console.log("Before if", req.session.user);
      console.log(req.session.user);
      console.log("New Value",req.body);
      console.log("Inside Updateprofiles");
      if (req.body.field == "firstname") {
        console.log("Inside Firstname Update");
        User.update(
          { username: req.session.user.username },
          {
            $set: {
              firstname: req.body.newvalue
            }
          },
          function (err, user) {
            console.log("USsssEEEEĒrrrrr", user);
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              console.log("Updation Successful");
              console.log("New Name",req.body.newvalue);
              req.session.user.firstname = req.body.newvalue;
              res.render('updateProfile', { title: 'UpdateProfile',userdetails: req.session.user });
            }
          });
  
      }
      else if (req.body.field == "password") {
        console.log("Inside Password Update");
        User.update(
          { username: req.session.user.username },
          {
            $set: {
              password: req.body.newvalue
            }
          },
          function (err, user) {
            console.log(user);
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              req.session.destroy();
              console.log("Updation Successful")
            }
          });
        res.redirect('/login')
      }
      else{
        res.redirect('/login');
      }
    }
     
  } catch (err) {
    res.send(err);
  }
  // res.send(req.body);
  // console.log(req.session.user);  
});

module.exports = router;
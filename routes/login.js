var express = require('express');
var router = express.Router();
var data = require('../data.json');
var User = require('../Model/User');
var jwt = require('jsonwebtoken');

/* GET home page. */

router.get('/', function (req, res, next) {
  try {
    console.log("inside login",req.session);
    if (req.session.user) {
      res.redirect('/login/profile');
    }
    else {
      res.render('login', {
        title: 'Login',
      });
    }
  }
  catch (e) {
    res.send(e);
  }
});

router.post('/loginpage', function (req, res, next) {
  //   res.render('login', { 
  //     title: 'Login',  
  //   });
  try {
    var username;
    var password;
    var token;
    console.log("Auth",req.session.auth);
    // if(req.session.auth){
    //   delete req.session.auth;
    //   res.redirect('/login');
    // }
    // console.log(username1);
    // if(username1.search("Invalid")){
    //   res.redirect('/login');
    // }
    // else {
      username = req.body.username;  
      password = req.body.password;
      console.log("Inside LoginPage");
      User.findOne({ username: username, password: password }, function (err, user) {
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
          if (!user.token) {
            if(user.role==="Admin"){
              console.log("Token Generation Started");
              token = jwt.sign(
                {
                  username: user.username,
                  firstname: user.firstname,
                },
                "secret key",
                {
                  expiresIn: "6h"
                }
              );
              User.update({ username: username },
                {
                  username: user.username,
                  password: user.password,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  token: token,
                  date: new Date()
                },
                {
                  upsert: true
                }, function (err, user) {
                  if (err) throw err;
    
                  // we have the updated user returned to us
                  console.log("Token Successfully Updated in DB");
                  console.log("token:",token);
                });
                const user1 = {
                  username: user.username,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  role: user.role
                  // timestamp:
                }
                req.session.user = user1;
                req.session.authorization = token;
                // console.log('Token Value inside if',user.token);
                // console.log('Authorization Token Value inside if',req.session.authorization);
                res.render('adminPage', {
                  title: 'AdminPage',
                  userdetails: user1,
                  token: token
                });
            }
            else {
              console.log("Token Generation Started");
              token = jwt.sign(
                {
                  username: user.username,
                  firstname: user.firstname,
                  lastname: user.lastname
                },
                "secret key",
                {
                  expiresIn: "6h"
                }
              );
              User.update({ username: username },
                {
                  username: user.username,
                  password: user.password,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  token: token,
                  date: new Date()
                },
                {
                  upsert: true
                }, function (err, user) {
                  if (err) throw err;
    
                  // we have the updated user returned to us
                  console.log("Token Successfully Updated in DB");
                  console.log("token:",token);
                });
                const user1 = {
                  username: user.username,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  role: user.role
                  // timestamp:
                }
                req.session.user = user1;
                req.session.authorization = token;
                // console.log('Token Value inside if',user.token);
                // console.log('Authorization Token Value inside if',req.session.authorization);
                res.render('loginpage', {
                  title: 'Loginpage',
                  userdetails: user1,
                  token: token
                });
            }
          } else {
            if(user.role==="Admin"){
              const user1 = {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role
              }
              req.session.user = user1;
              req.session.authorization = user.token;
              res.render('adminPage', {
                title: 'AdminPage',
                userdetails: req.session.user,
                token: token
              });
            }else {
              const user1 = {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role
              }
              req.session.user = user1;
              req.session.authorization = user.token;
              res.render('loginpage', {
                title: 'Loginpage',
                userdetails: req.session.user,
                token: token
              });
            }
            
          }
        }
        
        // res.send(JSON.stringify(user.firstname));
      })
    // }
    
  }
  catch (e) {
    console.log(e);
    res.send(e);
  }

});

router.get('/profile', function (req, res, next) {
  // res.render('profile', {
  //   title: 'Profile',
  // });
  try {
    if (!req.session.user) {
      res.redirect('/login');
    }
    console.log(req.session.user.username);
    User.findOne({ username: req.session.user.username }, function (err, user) {
      // console.log("After Checking");
      if (err) {
        res.sendStatus(500);
      } else {
        res.render('profile', {
          title: 'Profile',
          userdetails: user
        });
      }
    });
  }
  catch (e) {
    console.log(e);
    res.send(e);
  }
});

module.exports = router;
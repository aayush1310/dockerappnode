var express = require('express');
var router = express.Router();
var data = require('../data.json')
var User = require('../Model/User');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('adminRegister', {
    title: 'AdminRegister',
    userdetails: req.session.user,
  });
});

router.post('/registerpage', function (req, res, next) {
  //   res.render('login', { 
  //     title: 'Login',  
  //   });
  try {
    // res.send(req.session.user);
    if(req.session.user.role === "Admin"){
        var username = req.body.username;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
    
        var newUser = new User();
        newUser.username = username;
        newUser.password = password;
        newUser.firstname = firstname;
        newUser.lastname = lastname;
        newUser.role = "Admin";
        newUser.save(function (err, savedUser) {
          if (err) {
            // res.send("res.status(500)");
            console.log(err);
            res.send(err.errmsg);
          } else {
            res.render('adminRegisterSuccess', { title: 'RegisterSuccess',
            userdetails: req.body
           });
          }
        })
    }
    
  }
  catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
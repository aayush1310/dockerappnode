var express = require('express');
var router = express.Router();
var data = require('../data.json')
var User = require('../Model/User');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.user) {
    res.send('Cannot register when you are Logged In. Please press the back button to go back.');
  }
  else {
    res.render('register', {
      title: 'Register',
    });
  }
});

router.post('/registerpage', function (req, res, next) {
  //   res.render('login', { 
  //     title: 'Login',  
  //   });
  try {
    var username = req.body.username;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    var newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.role = "User";
    newUser.save(function (err, savedUser) {
      if (err) {
        // res.send("res.status(500)");
        console.log(err);
        res.send(err.errmsg);
      } else {
        res.render('registerSuccess', {
          title: 'Success',
          userdetails: req.body
        });
      }
    })
  }
  catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
var express = require('express');
var router = express.Router();
// var User = require('../Model/User');
var jwt = require('jsonwebtoken');
//var User = require('../models/user-model');
var alexadbr = require('../models/user-model');

var rUrl;
var rState;
var vId;

/* GET home page. */


router.get('/', function (req, res, next) {
  console.log("requests from Alexa-------:" + JSON.stringify(req.url));
  console.log("Stringify==>" + JSON.stringify(req.query));

  rUrl = req.query.redirect_uri;
  rState = req.query.state;
  vId = req.query.vendorId;
  console.log("after Vid==>" + vId + " State==> " + rState + " Url==> " + rUrl);

  const alexaSchema = new alexadbr({
    aurl: req.query.redirect_uri,
    avid: req.query.vendorId,
    astate: req.query.state,

    // password: {type: String},
    // firstname: String,
    // lastname: String,
    // token: String, 
  });
  alexaSchema.save(function (err, res) {
    if (err) {
      return err;
    } else {
      console.log("alexa Details addedd successfully" + res);
    }
  })

  try {
    // console.log("inside login",req.session);
    res.render('loginpage', {
      title: 'Login',
    });
  }
  catch (e) {
    res.send(e);
  }
});

router.post('/login', function (req, res, next) {
  //   res.render('login', { 
  //     title: 'Login',  
  //   });

  alexadbr.find({}, function (err, details) {
    if (err) {
      console.log("erroe" + err);
    } else {
      console.log("FindingDetails--------->" + details);
      console.log("url------\n"+details.aurl + "vendorId=\n" + details.avid + "state\n" + details.state + "accesstoken=ppp1111222ppp")
      var username;
      var password;
      var token;
      console.log("Auth", req.session.auth);
      console.log(req.body);
      console.log("In Login Page Vid==>" + vId + " State==> " + rState + " Url==> " + rUrl);
      // console.log("RURL\n" + rurl + "RSTSTE\n" + rState + "RVID\n" + vId);
      username = req.body.userame;
      password = req.body.password;
      console.log("Inside LoginPage");
     // return res.redirect(details.aurl + "?vendorId=" + details.avid + "&state=" + details.state + "&accesstoken=ppp1111222ppp");
     return res.redirect(rUrl + "?vendorId=" + vId + "&state=" + rState + "&code=ppp1111222ppp");
    }
  })
  // try {

  // if(req.session.auth){
  //   delete req.session.auth;
  //   res.redirect('/login');
  // }
  // console.log(username1);
  // if(username1.search("Invalid")){
  //   res.redirect('/login');
  // }
  // else {


  // https://pitangui.amazon.com/spa/skill/account-linking-status.html?vendorId=AAAAAAAAAAAAAA&state=xyz&code=SplxlOBeZQQYbYS6WxSbIA 

  // User.findOne({ username: username, password: password }, function (err, user) {
  //   if (err) {
  //     console.log(err);
  //     // return res.sendStatus(500);
  //     return res.redirect(rUrl);
  //   }
  //   else if (!user) {
  //     // return res.sendStatus(404);
  //     //   res.send("Authentication failure");
  //     console.log("User not found");
  //     return res.redirect(rUrl);
  //   }
  //   else if (user) {
  //     if (!user.token) {
  //       console.log("Token Generation Started");
  //       token = jwt.sign(
  //         {
  //           username: user.username,
  //           firstname: user.firstname,
  //           lastname: user.lastname
  //         },
  //         "secret key",
  //         {
  //           expiresIn: "6h"
  //         }
  //       );
  //       User.update({ username: username },
  //         {
  //           username: user.username,
  //           password: user.password,
  //           firstname: user.firstname,
  //           lastname: user.lastname,
  //           token: token,
  //           date: new Date()
  //         },
  //         {
  //           upsert: true
  //         }, function (err, user) {
  //           if (err) throw err;

  //           // we have the updated user returned to us
  //           console.log("Token Successfully Updated in DB");
  //           console.log("token:", token);
  //         });
  //       const user1 = {
  //         username: user.username,
  //         firstname: user.firstname,
  //         lastname: user.lastname,
  //         role: user.role
  //         // timestamp:
  //       }
  //       req.session.user = user1;
  //       req.session.authorization = token;
  //       // console.log('Token Value inside if',user.token);
  //       // console.log('Authorization Token Value inside if',req.session.authorization);
  //       res.render('loginpage', {
  //         title: 'Loginpage',
  //         userdetails: user1,
  //         token: token
  //       });
  //     } else {
  //       console.log("User Found Else")
  //       const user1 = {
  //         username: user.username,
  //         firstname: user.firstname,
  //         lastname: user.lastname,
  //         role: user.role,
  //         token: user.token
  //       }
  //       req.session.user = user1;
  //       req.session.authorization = user.token;
  //       //   res.render('loginpage', {
  //       //     title: 'Loginpage',
  //       //     userdetails: req.sess  ion.user,
  //       //     token: token
  //       //   });
  //       return res.redirect(rUrl);
  //     }
  //   } else {
  //     console.log("Inside Else");
  //     return res.redirect(rUrl);
  //   }

  //   // res.send(JSON.stringify(user.firstname));
  // })
  // // }

  // }
  //catch (e) {
  // console.log(e);
  // res.send(e);
  //}

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

router.post('/accessToken', function (req, res, next) {
  try {
    setTimeout(function () {
      console.log("Incoming Request in AccessToken----->" +JSON.stringify(req.body)); // + req.body);
      console.log("Incoming Request in AccessToken" +req.body.code); 
      //return res.send(rUrl + "?vendorId=" + vId + "&state=" + rState + "&code=Prasanna123");
      if(req.body.grant_type == "refresh_token"){
        console.log("Refresh Token--------");
        if(req.body.refresh_token == "Atzr|IQEBLzAtAhRPpMJxdwVz2Nn6f2y-tpJX2DeX"){
          res.json({ "access_token": "NewAccessToken@1", "expires_in":360,"refresh_token":"NewrefreshToken@1"});
        }else if(req.body.refresh_token == "NewrefreshToken@1"){
          res.json({ "access_token": "NewAccessToken@2", "expires_in":360,"refresh_token":"NewrefreshToken@2"});
        }else if(req.body.refresh_token == "NewrefreshToken@2"){
          res.json({ "access_token": "NewAccessToken@3", "expires_in":360,"refresh_token":"NewrefreshToken@3"});
        }else if(req.body.refresh_token == "NewrefreshToken@3"){
          res.json({ "access_token": "NewAccessToken@4", "expires_in":360,"refresh_token":"NewrefreshToken@4"});
        }
      }else{
        res.json({ "access_token": "NewaccessToken", "expires_in":360,"refresh_token":"Atzr|IQEBLzAtAhRPpMJxdwVz2Nn6f2y-tpJX2DeX"});
      }
    }, 4000)
   
  //   if(req.body.refresh_token == "Atzr|IQEBLzAtAhRPpMJxdwVz2Nn6f2y-tpJX2DeX"){
  //     var counter = counter+1;
  //    res.json({ "access_token": "987654321"+, "refresh_token":"Atzr|IQEBLzAtAhRPpMJxdwVz2Nn6f2y-tpJX2DeX"});
  //   }else{
  //  //   console.log()
  //   res.json({ "access_token": "123456789", "expires_in":180,"refresh_token":"Atzr|IQEBLzAtAhRPpMJxdwVz2Nn6f2y-tpJX2DeX","client_Id":"1234567"});
  //   }
 }
  catch (e) {
    console.log(e);
    res.send(e);
  }

});

module.exports = router;
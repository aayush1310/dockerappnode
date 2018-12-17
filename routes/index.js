var express = require('express');
var router = express.Router();
var data = require('../data.json')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Index User",req.session.user);
  res.render('index', { 
    title: 'Cities',
    jsondata: data,
    userdetails: req.session.user
  });
});

module.exports = router;
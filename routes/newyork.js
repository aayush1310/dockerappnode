var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('newyork', { title: 'New York',
  userdetails: req.session.user
 });
});

module.exports = router;

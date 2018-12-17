var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tokyo', { title: 'Tokyo',
  userdetails: req.session.user
 });
});

module.exports = router;

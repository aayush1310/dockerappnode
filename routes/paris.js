var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('paris', { title: 'Paris',
  userdetails: req.session.user
 });
  console.log(req.session.user);
});

module.exports = router;

var express = require('express');
var router = express.Router();
var data = require('../data.json')
var app = express();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  res.render('appetizers', { 
    title: 'Appetite',
    jsondata: data,
    id: req.params.id, 
    userdetails: req.session.user
  });
    // res.send(req.params.id);
    // res.end('Displaying information for uid ' + req.params.id); 
});

router.get('/:id/:name', function(req, res, next) {
  // res.render('appetizers', { 
  //   title: 'Appetite',
  //   jsondata: data,
  //   id: req.params.id 
  // });
    // res.send(req.params.id);
    res.end('Displaying information for name ' + req.params.name); 
});


module.exports = router;
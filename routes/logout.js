var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    try {
        // delete req.session.user;
        req.session.destroy();
        res.render('logout', { title: 'Logout',
    });
      }
      catch (e) {
        res.send(e);
      }
});

module.exports = router;
var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form validation', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
  req.session.success = null;
});

router.post('/submit', function(req, res, next) {
  req.check('email', 'Invalid email adress').isEmail();
  req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmpassword);

  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
  } else {
    req.session.success = true;
  }
  res.redirect('/');
});

module.exports = router;

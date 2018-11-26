var express = require('express');
var router = express.Router();
var faker = require('faker');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var obj = {};
  obj.name = faker.name.firstName();
  obj.title = faker.name.jobTitle();
  obj.color = faker.commerce.color();

  res.send(obj);
});

module.exports = router;

var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:32768/";


/* Viser pærerne som JSON */
router.get('/json', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("IKEA-Traadfri");
    dbo.collection("SmartBulbs").find({}).toArray(function (err, result) {
      if (err) throw err;
      // console.log(result);
      var obj = {};
      obj.smartbulb = result;
      res.json(obj);
      db.close();
    });
  });
});

/* Viser pærerne som en HTML side */
router.get('/', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("IKEA-Traadfri");
    dbo.collection("SmartBulbs").find({}).toArray(function (err, result) {
      if (err) throw err;
      //console.log(result);
      var obj = {};
      obj.title = 'Jubii, smartbulb virker';
      obj.smartbulb = result;
      res.render('smartbulb', obj);
      db.close();
    });
  });
});

/* Post requests opretter en ny pære */
router.post('/json', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("IKEA-Traadfri");
    var smartbulb = {};
    smartbulb.color = req.body.color;
    smartbulb.on = req.body.on;
    smartbulb.lightIntensity = req.body.lightIntensity;

    console.log("Farven på den nye pære er " + req.body.color) ;
    dbo.collection("SmartBulbs").insertOne(smartbulb, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
    res.redirect("/smartbulb/json");
  });
});


module.exports = router;

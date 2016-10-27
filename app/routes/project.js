var express = require('express');
var router = express.Router();
var models  = require('../models');
var isLoggedIn = require('../module/auth-middleware');
var github = require('octonode');
var mongojs = require('mongojs');

//Authentication API routes
module.exports = function(db) {

router.get('/store/:name', function(req, res, next) {

    var store = req.params.name;
    db.storesdb.findOne({name: store}, function(err, doc, next) {
      res.json(doc);
    });

});


router.get('/stores', function(req, res, next) {
    db.storesdb.find({},function (err, docs) {
      console.log(docs);
      res.json(docs);
    });
});


router.post('/add', function(req, res, next) {

    console.log(req.body);
    db.storesdb.insert(req.body, function(err, doc) {
        res.json(doc);
    });

});

router.delete('/remove/:name', function(req, res, next) {
    var storeName = req.params.name
    console.log(storeName);
    db.storesdb.remove({ name : storeName }, function(err, doc) {
      res.json(doc);
    });

});


router.delete('/delete/:id', function(req, res, next) {
  var id = req.params.id;
  console.log("delete:  " + id);
  db.storesdb.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

router.post('/save/:id', function(req, res, next) {
    console.log("save");
    var id = req.params.id;
    req.body._id = mongojs.ObjectId(id);
    console.log("add:  " + id);
    db.storesdb.insert(req.body, function(err, doc) {
        res.json(doc);
    });


});

return router;

}

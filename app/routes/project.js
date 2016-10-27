var express = require('express');
var router = express.Router();
var models  = require('../models');
var isLoggedIn = require('../module/auth-middleware');
var github = require('octonode');


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



router.put('/save/:id', function(req, res, next) {

    var id = req.params.id;
    console.log(id);
    console.log(req.body);
    db.projectlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
      update: {$set: req.body},  new: true}, function(err, doc) {
      res.json(doc);
    });



});

return router;

}

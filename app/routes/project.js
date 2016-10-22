var express = require('express');
var router = express.Router();
var models  = require('../models');
var isLoggedIn = require('../module/auth-middleware');
var github = require('octonode');


//Authentication API routes
module.exports = function(db) {

router.get('/stores', function(req, res, next) {
    db.storesdb.find(function (err, doc) {
      console.log(doc.data);
      res.json(doc.data)
    });
});

router.post('/save', function(req, res, next) {

    console.log(req.body.data);

    db.storesdb.insert(req.body.data, function(err, doc) {
       res.json(doc);
     });

  // save databa
  //db.mycollection.save(jsonData);
  // find everything
  /*db.storesdb.find(function (err, docs) {
    console.log(docs);
  })*/

  //res.json("{ 'value':'success'}");
});

return router;

}
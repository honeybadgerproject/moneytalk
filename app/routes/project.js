var express = require('express');
var router = express.Router();
var models  = require('../models');
var isLoggedIn = require('../module/auth-middleware');
var github = require('octonode');
var mongojs = require('mongojs');

var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json({ type: 'application/*+json' });

//Authentication API routes
module.exports = function(storesdb, salesdb, cardsdb) {


// ------------- find one

router.get('/store/:name', function(req, res, next) {

    var store = req.params.name;
    storesdb.storesdb.findOne({nombr: store}, function(err, doc, next) {
      res.json(doc);
    });

});

router.get('/sale/:name', function(req, res, next) {

    var store = req.params.name;
    salesdb.salesdb.findOne({nombr: store}, function(err, doc, next) {
      res.json(doc);
    });

});

router.get('/card/:name', function(req, res, next) {

    var store = req.params.name;
    cardsdb.cardsdb.findOne({nombr: store}, function(err, doc, next) {
      res.json(doc);
    });

});


//---------------- retrieve list

router.get('/stores', function(req, res, next) {
    storesdb.storesdb.find({},function (err, docs) {
      console.log(docs);
      res.json(docs);
    });
});

router.get('/sales', function(req, res, next) {
    salesdb.salesdb.find({},function (err, docs) {
      console.log(docs);
      res.json(docs);
    });
});

router.get('/cards', function(req, res, next) {
    cardsdb.cardsdb.find({},function (err, docs) {
      console.log(docs);
      res.json(docs);
    });
});


//-------------- insert

router.post('/add/store', function(req, res, next) {

    console.log(req.body);
    storesdb.storesdb.insert(req.body, function(err, doc) {
        res.json(doc);
    });

});

router.post('/add/sale', function(req, res, next) {

    console.log(req.body);
    salesdb.salesdb.insert(req.body, function(err, doc) {
        res.json(doc);
    });

});

router.post('/add/card', function(req, res, next) {

    console.log(req.body);
    cardsdb.cardsdb.insert(req.body, function(err, doc) {
        res.json(doc);
    });

});

//-------------- delete

router.delete('/remove/store/:name', function(req, res, next) {
    var storeName = req.params.name;
    console.log(storeName);
    storesdb.storesdb.remove({ nombr : storeName }, function(err, doc) {
      res.json(doc);
    });

});

router.delete('/remove/sale/:name', function(req, res, next) {
    var storeName = req.params.name;
    console.log(">>>>>>>>>>> store id   " + storeName);
    salesdb.salesdb.remove({ nombr : storeName }, function(err, doc) {
      res.json(doc);
    });

});

router.delete('/remove/card/:name', function(req, res, next) {
    var storeName = req.params.name;
    console.log(storeName);
    cardsdb.cardsdb.remove({ nombr : storeName }, function(err, doc) {
      res.json(doc);
    });

});

//-------------- remove

router.delete('/delete/store/:id', function(req, res, next) {
  var id = req.params.id;
  console.log("delete store:  " + id);
  storesdb.storesdb.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

router.delete('/delete/sale/:id', function(req, res, next) {
  var id = req.params.id;
  console.log("delete:  " + id);
  salesdb.salesdb.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

router.delete('/delete/card/:id', function(req, res, next) {
  var id = req.params.id;
  console.log("delete:  " + id);
  cardsdb.cardsdb.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

//----------- save

router.post('/save/store/:id', function(req, res, next) {
    console.log("save store");
    var id = req.params.id;
    req.body._id = mongojs.ObjectId(id);
    console.log("add:  " + id);
    storesdb.storesdb.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

router.post('/save/sale/:id', function(req, res, next) {
    console.log("save sale");
    var id = req.params.id;
    req.body._id = mongojs.ObjectId(id);
    console.log("add:  " + id);
    salesdb.salesdb.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

router.post('/save/card/:id', function(req, res, next) {
    console.log("save card");
    var id = req.params.id;
    req.body._id = mongojs.ObjectId(id);
    console.log("add:  " + id);
    cardsdb.cardsdb.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});


//--------- application queries

//--------- sales with filter
router.post('/request/saleswithfilters/',  jsonParser, function(req, res, next) {

    console.log(">>>>>>>> saleswithfilters   ");
    console.log(req.body);



    salesdb.salesdb.find({
      "categ": req.body.filter.categ ,
      "tarje.nombr": req.body.filter.tarje.nombr ,
      "tarje.banco": req.body.filter.tarje.banco ,
      "tarje.tipo": req.body.filter.tarje.tipo ,
      "tarje.clase": req.body.filter.tarje.clase
    }, function(err, doc, next) {

      var ids = req.body.ids;
      var deleteIds = new Array();

        for(var i=0; i<doc.length; i++) {
        console.log(">>> i    " + i);
        var tempIds = String(doc[i]._id);
        //Find and remove item from an array
        var j = ids.indexOf(tempIds);
        if(j != -1) {
          console.log(">>>>>> encontro  " + tempIds);
          doc.splice(i, 1);
          ids.splice(j,1);
          i = -1;
        }

      }

      var jsonDoc = {
          "RemoveIds" : ids ,
          "NewItems" : doc
      };


      res.json(jsonDoc);
    });

});

// cards
router.post('/request/cards/',  jsonParser, function(req, res, next) {

    console.log(req.body);



    cardsdb.cardsdb.find({
      "tarje.banco": req.body.banco ,
      "tarje.tipo": req.body.tipo
    }, function(err, doc, next) {

          res.json(doc);
    });

});


//------------ router

return router;

}

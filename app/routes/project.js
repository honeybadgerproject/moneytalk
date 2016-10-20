var express = require('express');
var router = express.Router();
var models  = require('../models');
var isLoggedIn = require('../module/auth-middleware');
var github = require('octonode');


/* GET users listing. */
router.get('/', function(req, res, next) {

  var user = {
    attributes: ['id', 'displayName', 'avatar'],
    model: models.User
  };

  if(req.query.userId !== undefined)
    user.where = {
      id: req.query.userId
    };

  models.Project.findAll({
    attributes: ['id', 'title', 'description', 'pageContent', 'price', 'rate', 'type'],
    include: [{
      attributes: ['name'],
      model: models.Category,
      through: {
        attributes: [],
        model: models.ProjectCategory
      }
    }, {
      attributes: ['name', 'lines'],
      model: models.Language,
      as: 'languages'
    }, {
      attributes: ['id', 'displayName'],
      model: models.User,
      as: 'likes',
      through: {
        attributes: [],
        model: models.ProductLikes
      }
    }, {
      attributes: ['id', 'displayName'],
      model: models.User,
      as: 'bought',
      through: {
        attributes: [],
        model: models.ProductBought
      }
    }, user]
  })
  .then(function(users) {
		res.json(users);
	});
});

router.get('/:id', function(req, res, next) {
  models.Project.findOne({
    where: { id: req.params.id },
    //attributes: ['id', 'title', 'description', 'pageContent', 'price', 'rate', 'type'],
    include: [{
      attributes: ['name'],
      model: models.Category,
      through: {
        attributes: [],
        model: models.ProjectCategory
      }
    }, {
      attributes: ['name', 'lines'],
      model: models.Language,
      as: 'languages'
    }, {
      attributes: ['id', 'displayName'],
      model: models.User,
      as: 'likes',
      through: {
        attributes: [],
        model: models.ProductLikes
      }
    }, {
      attributes: ['id', 'displayName'],
      model: models.User,
      as: 'bought',
      through: {
        attributes: [],
        model: models.ProductBought
      }
    }]
  })
  .then(function(projects) {
    res.json(projects);
  });
});

router.put('/:id', isLoggedIn, function(req, res, next) {
  models.Project
  .findOne({ where : { id: req.params.id } })
  .then(function(project) {
    project.update(req.body)
      .then(function(project) {
        res.json(project);
      });
  });
});

router.post('/', isLoggedIn, function(req, res, next) {
  var project = req.body;
  var sync = req.user.sync;

  //Creating Project Based on Github repository
  if(sync.github != undefined){
    var client = github.client(sync.github.token);

    client.get('/repos/' + project.owner + '/' + project.repository, { },
      function (err, status, repository, headers) {
        console.log(repository);
        var project = {
          title: repository.name,
          description: repository.description,
          clone: repository.clone_url,
          vendor: 'github',
          vendorId: repository.id,
          UserId: req.user.id
        };

        console.log("Brand new project: ")
        console.log(project);

        models.Project
          .findOrCreate({where: { vendorId: project.vendorId}, defaults: project})
          .spread(function(project, created) {
            console.log('Project has been created: ' + created);
            if(created) {
              client.get(repository.languages_url, { },
                function (err, status, repoLanguages, headers) {
                  var languages = [];

                  console.log(repoLanguages);
                  //Saving Languages
                  for (language in repoLanguages) {
                    languages.push({
                        name: language,
                        lines: repoLanguages[language],
                        ProjectId: project.id
                    });
                  }

                  console.log(languages);
                  models.Language.bulkCreate(languages).then(function() {
                    console.log('Languages created');
                  });

                  res.json(project);
                });
              } else { //End If
                res.json(project);
              }
          });
      });
    }
});

router.post('/:id/like', isLoggedIn, function(req, res, next) {
  var like = {
    ProjectId: req.params.id,
    UserId: req.user.id,
    status: 'active'
  };

  models.ProductLikes
    .findOrCreate({where: like, defaults: like })
    .spread(function(like, created) {
      console.log(like.get({plain:true}));
      res.json({
        id: req.user.id,
        displayName: req.user.displayName
      });
    });
});

router.delete('/:id/dislike', isLoggedIn, function(req, res, next) {
  var like = {
    ProjectId: req.params.id,
    UserId: req.user.id
  };

  models.ProductLikes
    .findOne({ where: like })
    .then(function(like) {
      like.destroy();
      res.json({
        id: req.user.id,
        displayName: req.user.displayName
      });
    });
});

module.exports = router;

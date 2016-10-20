var Promise = require("bluebird");
var github = require('octonode');

var gitAPI = function() {
  var _self = this;

  _self.getRepositories = function(account, exceptProjects) {
    if(account.name == 'github') {
      return new Promise(function(resolve, reject) {
        console.log(exceptProjects);
        var client = github.client(account.token);
        client.get('/user/repos', { affiliation: 'owner' }, function (err, status, data, headers) {
          for(var i in data) {
            console.log(data[i].id);
            if(data[i].id in exceptProjects) {
              data[i].id = exceptProjects[data[i].id].id;       ;
              data[i].imported = true;
            } else {
              data[i].imported = false;
            }

          }
          resolve(data);
        });
      });
    } else {
      return [];
    }
  }

}





module.exports = new gitAPI();

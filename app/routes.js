var mongoose = require('mongoose');
var User = require('./model.js');

module.exports = function(app) {

  //GET
  app.get('/users', function(req, res){
    var query = User.find({});
    query.exec(function(err, users){
      if(err)
      res.send(err);

      res.json(users);
    });
  });

  //POST
  app.post('/users', function(req,res){
    var newuser= new User(req.body);

    newuser.save(function(err){
      if(err)
      res.send(err);

      res.json(req.body);
    });
  });
};

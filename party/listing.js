var skills_list = require('../constants.js').skills_list;

module.exports.list = function(mongodb, mongourl, req, res, next){
  mongodb.connect(mongourl, function(err, conn) { 
    conn.collection('party', function(err, party){
      party.find({}).toArray(function(err, players){
        res.render('party_list', { players: players });
        conn.close();
      });
    });
  });
}

module.exports.show = function(mongodb, mongourl, id, req, res, next){
  mongodb.connect(mongourl, function(err, conn) { 
    conn.collection('party', function(err, party){
      party.findOne({_id: id}, function(err, player){
        res.render('party_edit', { player: player, skills: skills_list });
        conn.close();
      });
    });
  });
}

module.exports.create = function(mongodb, mongourl, req, res, next){

  var player = get_empty_player();
  res.render('party_edit', { player: player, skills: skills_list })

}

module.exports.edit = function(mongodb, mongourl, id, req, res, next){
  mongodb.connect(mongourl, function(err, conn) { 
    conn.collection('party', function(err, party){

      /* pull update values directly from form */
      var update = req.body;
      delete update.id

      /* mark un-checked skills as not trained */
      for(var skill in skills_list){
        if(!update["skills."+skills_list[skill]+".trained"]){
          update["skills."+skills_list[skill]+".trained"] = false;
        }
      }

      /* save the change and re-render the page */
      party.update({_id: id}, {$set: update}, {safe:true, upsert:true}, function(err, doc) {
        party.findOne({_id: id}, function(err, player){
          res.render('party_edit', { player: player, skills: skills_list });
          conn.close();
        });
      });
    });
  });
}

get_empty_player = function(){
  var player = { level:1, race: 'human', class: 'unknown', hp: 30, spd: 6, init: 6,
    str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10, ac: 10, fort: 10, ref: 10, will: 10};

  player._id = null;

  player.passive = { insight: 20, perception: 20 };

  player.skills = {};

  for(skill in skills_list){
    player.skills[skills_list[skill]] = {check: 1, trained: false};
  }

  return player;
}

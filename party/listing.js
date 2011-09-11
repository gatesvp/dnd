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
        res.render('party_edit', { player: player });
        conn.close();
      });
    });
  });
}
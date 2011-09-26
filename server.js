var default_port = process.env.PORT || 8080;
var public = __dirname + '/public';

/* Configure plug-ins */
var sys = require('sys');
var express = require('express');
var jade = require('jade');
var mongodb = require('mongodb');

/* Configure DB connections */
var mongourl = require('./mongo_utils').generate_mongo_url();

/* Configure application */
var app = express.createServer();
require('./configure/app_config.js').set_configuration(app, express, public);

app.get('/', function(req, res, next){
  res.render('hello')
});

app.get('/party', function(req, res, next){
  require('./party/listing.js').list(mongodb, mongourl, req, res, next);
});

app.get('/party/create', function(req, res, next){
  require('./party/listing.js').create(mongodb, mongourl, req, res, next);
});

app.post('/party/create', function(req, res, next){
  require('./party/listing.js').edit(mongodb, mongourl, req.body.id, req, res, next);
})

app.get('/party/edit/:id', function(req, res, next){
  require('./party/listing.js').show(mongodb, mongourl, req.params.id, req, res, next);
});

app.post('/party/edit/:id', function(req, res, next){
  require('./party/listing.js').edit(mongodb, mongourl, req.params.id, req, res, next);
});
app.listen(default_port); 


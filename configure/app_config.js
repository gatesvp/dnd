module.exports.set_configuration = function(app, express, public) {
  app.configure( function() {
    app.set('view engine', 'jade');
    app.use(express.favicon((public+'/favicon.ico')));
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(public));
    app.use('/', express.errorHandler({ dump: true, stack: true }));
  });
}
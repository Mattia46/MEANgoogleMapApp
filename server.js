 var express         = require('express');
 var mongoose        = require('mongoose');
 var port            = process.env.PORT || 3000;
 var morgan          = require('morgan');
 var bodyParser      = require('body-parser');
 var methodOverride  = require('method-override');
 var app             = express();

 // Express Configuration
 // -----------------------------------------------------
 // Sets the connection to MongoDB
 mongoose.connect("mongodb://localhost/MeanMapApp");

 // Logging and Parsing
 app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
 app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use BowerComponents
 app.use(morgan('dev'));                                         // log with
 app.use(bodyParser.json());                                     // parse
 app.use(bodyParser.urlencoded({extended: true}));               // parse
 app.use(bodyParser.text());                                     // allows
 app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse
 app.use(methodOverride());

 // Routes
 // ------------------------------------------------------
 // require('./app/routes.js')(app);

 // Listen
 // -------------------------------------------------------
 app.listen(port);
 console.log('App listening on port ' + port);
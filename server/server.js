var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var app = express();
var morgan = require('morgan');
// var dotenv = require('dotenv');
var dotenv = require('dotenv').config();

var dummy = require('./db/dummy.js');


// dotenv.load();
var db = require('./db/db.js');


var routesReview = require('./routes/routesReview.js');
var routesUser = require('./routes/routesUser.js');
var routesToilet = require('./routes/routesToilets.js');
var routesAuth = require('./routes/routesAuth.js');
var routesTag = require('./routes/routesTag.js');

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('./src'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name');
  next();
});

//Routing
app.use('/api/review', routesReview);
app.use('/api/user', routesUser);
app.use('/api/toilet', routesToilet);
app.use('/api/auth', routesAuth);
app.use('/api/tag', routesTag);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  db.ensureSchema();
  dummy.init();
  console.log(moment().format('h:mm:ss a') + ': Express Server listening on port', app.get('port'));
});

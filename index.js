/**
* Module dependencies
*/

var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	errorhandler = require('errorhandler'),
	morgan = require('morgan'),
	routes = require('./routes/routes'),
	http = require('http'),
	config = require('./config');

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 80);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname+"/public"));

app.set('superSecret', config.secret);

var env = process.env.NODE_ENV || 'production';

// development only
if (env === 'development') {
	app.use(errorhandler());
}

var api = require('./routes/api');

/**
 * Routes
 */
// serve index and view partials
app.get('/', routes.index);
app.get('/home', routes.index);

/* JSON API */

// Guests
app.get('/api/guests', api.Guests.getAll);

// Dedicatories
app.get('/api/dedicatories', api.Dedicatories.getAll);

// Image gallery
app.get('/api/gallery', api.Images.getAll);

// redirect all others to the index (HTML5 history) Use in production only
app.get('*', routes.index);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});

/**
 * Module dependencies.
 */


// controllers
var webadmin = require('../app/controllers/webadmin');
var xmlparser = require('express-xml-bodyparser');
var config = require('./config');

/**
 * Expose
 */


module.exports = function (app) {

	// Webadmin
	app.get(config.prefix, webadmin.index);
	app.post(config.prefix, xmlparser({trim: false, explicitArray: false}), webadmin.receive);

}

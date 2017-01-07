
/**
 * Module dependencies.
 */


// controllers
var webadmin = require('../app/controllers/webadmin');
var xmlparser = require('express-xml-bodyparser');

/**
 * Expose
 */


module.exports = function (app) {

	// Webadmin
	app.get('/fkit', webadmin.index);
	app.post('/fkit', xmlparser({trim: false, explicitArray: false}), webadmin.receive);

}

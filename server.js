
/**
 * Module dependencies
 */

var express = require('express');
var http = require('http');
var fs = require('fs');
var common = require('./app/util/common');



http.globalAgent.maxSockets = Infinity;
var app = express();



// Bootstrap application settings
require('./config/express')(app, common.config);

// Bootstrap routes
require('./config/routes')(app);


// Start the app by listening on <port>
var port = process.env.PORT || 9000;
app.listen(port, '127.0.0.1', function() {
	console.log(common.util.format('%s | fkit-wechatbot app started on port %d',(new Date()), port));
	console.log("=== LOGS ==========================================");
});

// Expose app
module.exports = app;

// Schedule cronjobs
//cron.schedule();

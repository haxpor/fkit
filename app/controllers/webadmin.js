/**
 * Module dependencies.
 */
var util = require("util");
var rFormatter = require("../message/reply-msg-format.js");
var commands = require("../message/commands");

// processor's functions to process message for each command type
var p_translate = require("../message/processor-translate");

exports.index = function(req, res, next) {

	// verify signature that the request is sent by WeChat Official Account System
	// see http://admin.wechat.com/wiki/index.php?title=Getting_Started for method to verify
	// FKIT_TOKEN is set as environment variable via `export FKIT_TOKEN=xxxxx` outside of this code on system
	
	// get params
	var token = process.env.FKIT_TOKEN;
	var timestamp = req.param('timestamp', null);
	var nonce = req.param('nonce', null);

	// sort string
	var sorted_str = [token, timestamp, nonce].sort();
	var chk_str = sorted_str.join("");

	var sha1 = require("sha1");
	// encrypt with sha1
	chk_str = sha1(chk_str);
	if (chk_str === req.param('signature', null)) {
		// verified
		console.log("verified");
		echo_str = req.param('echostr', null);
		res.send(echo_str);	
	}
	else {
		console.log("not verify");
		// not verified
		res.send(null);
	}
}

/*
	Process message then return object containing content and its message type.

	Return: { content: *String*, type: *String*, ... }
	... depends on type of message to return
 */
exports.processMessage = function (from, to, message) {
  // figure out if this is for us
 	//return "i Love u";

 	// no command, or just plain text => msg
 	if (message.search(":") == -1) {
 		return { content: 'You sent: ' + message, type: 'text' };
 	}
 	// other commands
 	else {
 		var tokens = message.split(" ");
 		var command = tokens[0];
 		tokens.shift();	// get only params
 		if (tokens.length > 0) {
 			return exports.processCommand(command, tokens);
 		}
 		else {
 			// malformed
 			return { content: 'msg malformed', type: 'text' };
 		}
 	}
}

exports.processCommand = function(command, params) {
	// no command
	if (command == null || command == "") {
		return null;
	}

	// lower case input command
	var lcCommand = command.toLowerCase();

	// check for matching of command then return appropriate result
	if (lcCommand == commands.translate) {
		return p_translate(params);
	}
	else {
		return { content: 'unsupported command', type: 'text' };
	}
}

exports.receive = function(req, res, next) {
	console.log("receiving: ", req.body.xml);
	
	// get content sending in from user
	toUser = req.body.xml.tousername[0];
	fromUser = req.body.xml.fromusername[0];
	msgtype = req.body.xml.msgtype[0];
	content = req.body.xml.content[0];
	creationTime = parseInt(req.body.xml.createtime[0]);
	res.contentType("application/xml");

	var retObj = exports.processMessage(toUser, fromUser, content);

	var responseStr = null;

	if (retObj.type == 'text') {
		responseStr = rFormatter.msg(retObj.content, fromUser, toUser, creationTime+1);
	}
	else if (retObj.type == 'link') {
		//url, title, description, toUser, fromUser, creationTime
		responseStr = rFormatter.rich(retObj.content, 'https://66fce469.ngrok.io/fkit/images/sample-pic.jpg', 'Link title', 'Link Description', fromUser, toUser, creationTime+1);
	}

	console.log("response: ", responseStr);
	res.send(responseStr);
}


/**
 * Module dependencies.
 */
var util = require("util");
var rFormatter = require("../message/reply-msg-format.js");
var commands = require("../message/commands");
var errorCode = require("../core/error-code");
var wechatMsgType = require("../message/wechat-msgtype");

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

	return new Promise( (resolve, reject) => {

		// no command, or just plain text => msg
	 	if (message.search(":") == -1) {
	 		return resolve({ content: 'You entered: ' + message, type: 'text' });
	 	}
	 	// other commands
	 	else {
	 		var tokens = message.split(" ");
	 		var command = tokens[0];
	 		tokens.shift();	// get only params
	 		if (tokens.length > 0) {
	 			return exports.processCommand(command, tokens, resolve, reject);
	 		}
	 		else {
	 			// malformed
	 			var e = new Error('Messge is malformed. Follow : by a command name.');
	 			e.code = errorCode.commandMalformed;
	 			return reject(e);
	 		}
	 	}
	});
}

// relay promise
exports.processCommand = function(command, params, resolve, reject) {
	// no command
	if (command == null || command == "") {
		var e = new Error("Command is null or empty.");
		e.code = errorCode.commandIsNullOrEmpty;
		return reject(e);
	}

	// lower case input command
	var lcCommand = command.toLowerCase();

	// check for matching of command then return appropriate result
	if (lcCommand == commands.translate) {
		return p_translate(params, resolve, reject);
	}
	else {
		var e = new Error("Command is not recognized. Make sure your input command is correct.");
		e.code = errorCode.commandNotRecognized;
		return reject(e);
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

	var responseStr = null;

	exports.processMessage(toUser, fromUser, content)
		.then((result) => {

			if (result.type == wechatMsgType.text) {
				responseStr = rFormatter.msg(result.content, fromUser, toUser, creationTime+1);
			}
			else if (result.type == wechatMsgType.link) {
				//url, title, description, toUser, fromUser, creationTime
				responseStr = rFormatter.rich(result.content, 'https://api.wasin.io/fkit/images/sample-pic.jpg', result.link_title, result.link_description, fromUser, toUser, creationTime+1);
			}

			console.log("response: ", responseStr);
			res.send(responseStr);

		}, (e) => {
			if (e.code == errorCode.commandMalformed) {
				responseStr = rFormatter.msg(e.message, fromUser, toUser, creationTime+1);
			}
			else if (e.code == errorCode.commandIsNullOrEmpty) {
				responseStr = rFormatter.msg('Unregconized error code. Capture current screenshot and send it to haxpor@gmail.com for support', fromUser, toUser, creationTime+1);
			}
			else if (e.code == errorCode.commandNotRecognized) {
				responseStr = rFormatter.msg(e.message, fromUser, toUser, creationTime+1);
			}
			else if (e.code == errorCode.extractedTextIsNullOrEmpty) {
				responseStr = rFormatter.msg(e.message, fromUser, toUser, creationTime+1);
			}
			else if (e.code == errorCode.translatedTextIsEmpty) {
				responseStr = rFormatter.msg(e.message, fromUser, toUser, creationTime+1);
			}
			else {
				responseStr = rFormatter.msg("Error code " + e.code + " [" + e.message + "]", fromUser, toUser, creationTime+1);
			}

			res.send(responseStr);
		});
}


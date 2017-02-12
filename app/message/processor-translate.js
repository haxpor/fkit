/**
 * Here is the declaration for 'translate' command's processor
 * Relay promise
 * 
 * require it: var p_translate = require('processor-translate')
 * use it: p_translate(params)
 */
var bfet = require('bfet');
var htmlToText = require('html-to-text');
var Baidut = require('baidut');
var wechat_msgType = require('./wechat-msgtype');
var errorCode = require('../core/error-code');
var fs = require('fs');
var sha1 = require('sha1');
var commands = require('./commands');
var errorCode = require('../core/error-code');
var config = require('../../config/config');

// combine array of translated texts result from Baidu
// note: trans maintain the same structure of data sending back from Baidu
// return combined translated string
function combineAllTransResult(trans) {
	if (trans == null || trans == undefined)
		return null;

	if (trans != null && trans.length <= 0)
		return null;

	var formed = "";
	for (let i=0; i<trans.length; i++) {
		formed += trans[i].dst + "<br/><br/>";
	}
	return formed;
}

module.exports = function(params, resolve, reject) {

	// params: url [from_lang] [to_lang]
	console.log(params[0], params[1], params[2]);

	bfet.get(params[0], null, { json_parse: false })
		.then((result) => {
			console.log('got result from bfet');

			// convert from html to nice text
			var text = htmlToText.fromString(result, {});

			if (text == null || text == "") {
				var e = new Error("Extracted text is null or empty");
				e.code = errorCode.extractedTextIsNullOrEmpty;
				return reject(e);
			}
			else {
				// translate via Baidut
				var opts = {
					from_lang: params[1] != null && params[1] != undefined ? params[1] : 'zh',
					to_lang: params[2] != null && params[2] != undefined ? params[2] : 'en'
				};

				Baidut.translate(text, opts)
					.then((_r) => {
						console.log(_r);

						if (_r.trans_result == null || _r.trans_result == undefined) {
							var e = new Error("Translated text is empty.");
							e.code = errorCode.translatedTextIsEmpty;
							return reject(e);
						}
						else if (_r.trans_result != null && _r.trans_result.length <= 0) {
							var e = new Error("Translated text is empty.");
							e.code = errorCode.translatedTextIsEmpty;
							return reject(e);
						}
						else {

							// form file name
							// filename = translated text + time + url + command
							var salt = (new Date).getTime();
							let filename = sha1(_r.trans_result[0].dst + salt + params[0] + commands.translate);
							console.log("sha1: " + filename);

							// write extracted text to file
							// note: it's synchronized
							console.log(config.root + "/public/gens/" + filename + ".html");
							fs.writeFileSync(config.root + "/public/gens/" + filename + ".html", combineAllTransResult(_r.trans_result), function(err) {
								if (err) {
									var e = new Error("Error writing translated text to file.");
									e.code = errorCode.writeTranslatedTextToFileError;
									return reject(e);
								}
								else {
									console.log('wrote translated text to file successfully.');
								}
							});

							// url to our generated html
							var genUrl = process.env.FKIT_URL + config.prefix + "/gens/" + filename + ".html";

							return resolve(
								{ 
									content: genUrl, 
									type: wechat_msgType.link, 
									link_title: _r.trans_result[0].dst,
									link_description: _r.trans_result.length > 1 ? _r.trans_result[1].dst : _r.trans_result[0].dst
								}
							);
						}
					}, (_e) => {
						return reject(_e);
					});
			}
		}, (e) => {
			console.log('got error from bfet');
			return reject(e);
		});
}
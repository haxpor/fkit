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

module.exports = function(params, resolve, reject) {

	// params: url [from_lang] [to_lang]
	console.log(params[0], params[1], params[2]);

	bfet.get(params[0], null, { json_parse: false })
		.then((result) => {
			console.log('got result from bfet');

			// convert from html to nice text
			var text = htmlToText.fromString(result, {});

			// translate via Baidut
			Baidut.translate(text)
				.then((_r) => {
					console.log(_r);
					return resolve(
						{ 
							content: params[0], 
							type: wechat_msgType.link, 
							link_title: _r.trans_result[0].dst,
							link_description: _r.trans_result[1].dst
						}
					);
				}, (_e) => {
					return reject(_e);
				});
		}, (e) => {
			console.log('got error from bfet');
			return reject(e);
		});
}
/**
 * Here is the declaration for 'translate' command's processor
 * Relay promise
 * 
 * require it: var p_translate = require('processor-translate')
 * use it: p_translate(params)
 */

var bfet = require('bfet');

module.exports = function(params, resolve, reject) {

	// params: url [from_lang] [to_lang]
	console.log(params[0], params[1], params[2]);

	bfet.get(params[0], null, { json_parse: false })
		.then((result) => {
			console.log('got result from bfet');
			// process result here...
			return resolve({ content: params[0], type: 'link' });
		}, (e) => {
			console.log('got error from bfet');
			return reject(e);
		});
}
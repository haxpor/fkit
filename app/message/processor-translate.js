/**
 * Here is the declaration for 'translate' command's processor
 * 
 * require it: var p_translate = require('processor-translate')
 * use it: p_translate(params)
 */

module.exports = function(params) {

	// params: url [from_lang] [to_lang]
	console.log(params[0], params[1], params[2]);

	return { content: params[0], type: 'link' };
}
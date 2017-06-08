/*!
 * Module dependencies.
 */

var path = require('path');
var root_path = path.resolve(__dirname + '/../');
var prefix_path = '/fkit';
var Baidut = require('baidut');

// set environment for baidut
Baidut.builder
	.setAppId(process.env.FKIT_APPID)
	.setKey(process.env.FKIT_KEY)
	.build();

/**
 * Expose config
 */
module.exports = {
	root: root_path,
	prefix: prefix_path,
	time_format: 'YYYY-MM-DD HH:mm:ss'
}

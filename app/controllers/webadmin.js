/**
 * Module dependencies.
 */
var util = require("util");

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

exports.message = function (from, to, message) {
  // figure out if this is for us
 	return "i Love u";
}

exports.receive = function(req, res, next) {
	//curl -X POST --data @sample.xml http://localhost:5003/ --header "Content-Type:text/xml"
	
	// { xml: 
	// 	2014-03-13T10:02:10.060573+00:00 app[web.1]:    { tousername: [ 'gh_5108e39bfd75' ],
	// 	2014-03-13T10:02:10.060573+00:00 app[web.1]:      fromusername: [ 'oDvuOuMVDkSj4iU_Vh3mf0sHjyhg' ],
	// 	2014-03-13T10:02:10.060573+00:00 app[web.1]:      createtime: [ '1394704892' ],
	// 	2014-03-13T10:02:10.060573+00:00 app[web.1]:      msgtype: [ 'text' ],
	// 	2014-03-13T10:02:10.060573+00:00 app[web.1]:      content: [ 'How are you' ],
	// 	2014-03-13T10:02:10.060573+00:00 app[web.1]:      msgid: [ '5990211898911335179' ] } }
	
	
	tousername = req.body.xml.tousername[0];
	fromusername = req.body.xml.fromusername[0];
	msgtype = req.body.xml.msgtype[0];
	content = req.body.xml.content[0];
	createtime = parseInt(req.body.xml.createtime[0]);
	res.contentType("application/xml");
	reply = exports.message(tousername,fromusername,content)
	str = util.format("<xml><ToUserName>%s</ToUserName><FromUserName>%s</FromUserName><CreateTime>%d</CreateTime><MsgType>text</MsgType><Content><![CDATA[%s]]></Content></xml>",fromusername,tousername,createtime+1,reply);
	console.log(str);
	res.send(str);
}


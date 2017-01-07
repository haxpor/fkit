/**
 * Module dependencies.
 */
var util = require("util");

exports.index = function(req, res, next) {

		echo_str = req.param('echostr', null)
		res.send(echo_str);	
	
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


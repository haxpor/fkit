var format = {};

// main form: msg
format.msg = function(msg, toUser, fromUser, creationTime) {
	return `<xml>
<ToUserName><![CDATA[${toUser}]]></ToUserName>
<FromUserName><![CDATA[${fromUser}]]></FromUserName> 
<CreateTime>${creationTime}</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[${msg}]]></Content>
<FuncFlag>0</FuncFlag>
</xml>`;
}

// main form: title, description, url, picUrl
format.rich = function(url, picUrl, title, description, toUser, fromUser, creationTime) {
	return `<xml>
<ToUserName><![CDATA[${toUser}]]></ToUserName>
<FromUserName><![CDATA[${fromUser}]]></FromUserName>
<CreateTime>${creationTime}</CreateTime>
<MsgType><![CDATA[news]]></MsgType>
<ArticleCount>1</ArticleCount>
<Articles>
<item>
<Title><![CDATA[${title}]]></Title> 
<Description><![CDATA[${description}]]></Description>
<PicUrl><![CDATA[${picUrl}]]></PicUrl>
<Url><![CDATA[${url}]]></Url>
</item>
</Articles>
<FuncFlag>1</FuncFlag>
</xml>`;
}

module.exports = format;
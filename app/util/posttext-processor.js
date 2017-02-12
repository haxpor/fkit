// post-text processor
// it processes the final result of combined text
// this will collect artifacts that html-to-text left via result processed plain text
// it revolves around bootstrap css

function prefix(resultText) {
	var title = findTitle(resultText);

	var prefix = `<!DOCTYPE html>
	<head>
		<title>${title}</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	</head>
	<body>
		<div class="container">
	`;

	return prefix + resultText;
}

function suffix(resultText) {
	var postfix = `
		</div>
	</body>
	`;

	return resultText + postfix;
}

function findTitle(resultText) {
	return resultText.split("</p>", 1)[0].substring(3);
}

function boldHeadText(resultText) {

	var pResult = "";

	var i=0;

	return resultText.replace(/<p>(.+?)<\/p>/ig, function($0, $1) { 

		var innerText = $1;

		// always process for title (first element)
		if (i == 0) {
			i++;
			return "<h1>" + $1 + "</h1>";				
		}
		else if (innerText.length <= 50 && innerText.search(/\./) == -1) {
			i++;
			return "<h3>" + $1 + "</h3>";
		}
		else {
			i++;
			return $0;
		}
	});
}

function img(resultText) {
	return resultText.replace(/\[(.+?)\]/ig, function($0, $1) { 

		return "<img src=\"" + $1 + "\" class='img-responsive' style='text-align: center; margin: auto;'/>";
	});
}

module.exports = function(resultText) {

	// prefix it
	resultText = prefix(resultText)
	// bold text
	resultText = boldHeadText(resultText);

	resultText = img(resultText);

	resultText = suffix(resultText);
	return resultText;
}
var http = require('http');  
var yelp = require('./yelpMod');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("Result: " + yelp.result());
	res.end(' ... YAY!');
}).listen(8080);
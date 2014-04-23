var http = require("http");
var url = require("url");
var util = require("util");
var PORT = 3000;

var server = http.createServer();

server.on("request", function(req, res) {
	var urlData = url.parse(req.url, true);
	console.log(util.inspect(urlData,{colors:true}))
	var time = new Date();
	res.end(time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
});

server.listen(PORT,function(){
	console.log("Server listening on port "+PORT)
});
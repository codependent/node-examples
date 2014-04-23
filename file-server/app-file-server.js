var http = require("http");
var url = require("url");
var util = require("util");
var fs = require('fs');
var path = require('path');
//var Magic = require('mmmagic').Magic;
var PORT = 3000;
var CACHE_ENTRY_EVICT_TIME = 10000;

// these flags can also be shortened down to just: mmm.MAGIC_MIME
//var magic = new Magic(mmm.MAGIC_MIME_TYPE | mmm.MAGIC_MIME_ENCODING);
var server = http.createServer();

var fileContentCache = {};

server.on("request", function(req, res) {
	var urlData = url.parse(req.url, true);
	console.log("*** ",util.inspect(urlData,{colors:true}))
	var filePath = './public/'+urlData.pathname;
	if(fs.existsSync(filePath)){
		// Query the entry
    	stats = fs.lstatSync(filePath);    	
    	if (stats.isDirectory()) {
        	res.writeHead(403);
        	res.end("No se puede listar el directorio");
    	}else{
    		/*magic.detectFile('node_modules/mmmagic/build/Release/magic.node', function(err, result) {
		  	if (err) throw err;
		  	console.log(result);
		  	var split = result.split(";");
		  	console.log(split);
		  	res.writeHead(200, {
	    		'Content-Type': 'audio/mpeg',
	    		'Content-Length': stat.size
			});
			var readStream = fs.createReadStream(filePath,{ flags: 'r', encoding: null, fd: null, mode: 0666, autoClose: true});
			readStream.pipe(response);			    
			});  */				
			if(urlData.query.content !== undefined){

				if(fileContentCache[filePath]){
					console.log("--- Sirviendo contenido cacheado")
					res.end(fileContentCache[filePath]);	
				}else{
					console.log("--- Leyendo contenido")
					fs.readFile(filePath, function(err, data) {
						if (err) { 
							res.writeHead(500); 
							res.end("Server error");
						}
						console.log("--- Se añade el contenido a la caché");
						fileContentCache[filePath]=data;
						setTimeout(function(){
							console.log("XXX evicting ",filePath);
							delete fileContentCache[filePath]
						},CACHE_ENTRY_EVICT_TIME);
						res.end(data);					
					});
				}				
			}else{
				res.writeHead(200, {
					'Content-Type': 'text/plain',
					'Content-disposition': 'attachment; filename='+path.basename(urlData.pathname) 
				});
				var readStream = fs.createReadStream(filePath,{ flags: 'r', encoding: null, fd: null, mode: 0666, autoClose: true});
				readStream.pipe(res);		
			}
    	}
	}else{
		res.writeHead(404);
		res.end("El fichero " +urlData.pathname+ " no existe");
	}
});

server.listen(PORT,function(){
	console.log("Server listening on port "+PORT)
});
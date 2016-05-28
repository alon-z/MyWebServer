var http = require('http');
var fs = require('fs');

// 404!
function send404(response) {
	response.writeHead(404, {"Content-Type": "text/plane"});
	response.write("Yap, that's an 404...")
	response.end();
}

function onRequest(request, response) {
	if(request.method == 'GET' && request.url == '/' ){
		response.writeHead(200, {"Content-Type": "text/html"})
		fs.createReadStream("./index.html").pipe(response);
	} else {
		try {
			file = fs.createReadStream("." + request.url);
			file.on('error', send404(response));
			response.writeHead(200, {"Content-Type": "text/html"})
			file.pipe(response);
		}
		catch(err) {
			send404();
		}
	}
}

http.createServer(onRequest).listen(80, "0.0.0.0");
console.log("Server created");

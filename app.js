var http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer(function(req,res){
	res.statusCode = 200;
	res.setHeader('Content-Type','text/html');
	res.end('Hello');
});

server.listen(port,()=>{
	console.log('Listening on port '+port);
});

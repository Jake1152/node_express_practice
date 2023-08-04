const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
	try {
		
		res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
		const data = await fs.readFile('server42.html');
		res.end(data);
	} catch (err) {
		console.error(err);
		res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8' });
		res.end(err.message);
	}
})
	.listen(8080); // 80번 포트는 보통 이미 쓰이고 있기에 error발생
server.on('listening', () => {
	console.log('Now server waiting on 8080 port.');
});

const server1 = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html; charset=uft-8'});
	res.write('<h1>Hello Node!</h1>');
	res.write('<p>Hello server </p>');
	res.end('<p>Hello Jake </p>')
})
	.listen(8081);

server.on('error', (error) => {
	console.error(error);
});

server1.on('error', (error) => {
	console.error(error);
});

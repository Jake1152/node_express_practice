const http = require('http');

http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html; charset=uft=8' });
	res.write('<h1>Hello Node!</h1>');
	res.end('<p>Hello My Server!</p>');
})
	.listen(8080, () => { // server connected
		console.log('8080번 포트에서 서버 대기 중입니다!');
});
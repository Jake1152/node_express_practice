const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('combined'));
app.use('요청 경로', express.static('실제 경로'));
app.use('/', express.static(__dirname, ''));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * 요청경로와 실제 경로가 다르다
 * localhost:3000/jake.html
 * 실제 서버에서의 경로 /public/jake.html
 * localhost:3000/app.js
 * 실제 서버에서의 경로 /public/app.js
 * public은 유명하므로 다른 값을 넣는 것을 추천한다.
 * e.g) public-4242/jake.html
 * static route를 함으로써 요청 경로와 실제 경로가 다르게 되므로 보안에도 도움된다.
 * 미들웨어 간에도 순서가 많이 중요하다.
 */


// app.use(express.static());


/**
 * Static 정적파일을 보내주는 작업을 한다
 */
app.get('/', (req, res, next) => {
    req.body
    res.sendFile(path.join(__dirname, 'index.html'));
});
/*
 * 위에 두줄의 코드를 씀으로써  아래처럼 길게 코드를 적을 필요가 없어졌다.
    req.on('data', (data) => {
        body += data;
    });
    return req.on('end', () => {
        console.log('PUT content(body):', body);
        const { name } = JSON.parse(body).name;
        users[key] = JSON.parse(body).name;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
        return res.end(JSON.stringify(users));
    });
*/
// app.use('/', (req, res, next) => {
//     console.log('1 요청에 실행');
// 	next();
// });

/**
 * old way with 
 * app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
 * 
   
 */

/**
 * Add cookie parser
 */
app.get('/', (req, res, next) => {
    req.cookies; // { mycookie: 'test'}
    req.signedCookies; // 쿠키를 암호화 할 수 있다.
    // String 방식
    // 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toHMTString()}; HttpOnly; Path=/`,
    // method 방식 res.cookie
    res.cookie('name', encodeURIComponent(), {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    })
    res.clearCookie('name', encodeURIComponent(), {
        httpOnly: true,
        path: '/',
    })
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    res.send('hello express!');
});

app.get('/category/Javascript', (req, res) => {
    res.send('hello Javascript');
});

app.get('/about', (req, res) => {
    res.send('hello express');
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(200).send('error 발생, 하지만 status code로 알려주지는 않는다.');
})

app.listen(app.get('port'), () => {
    console.log('server listen');
});
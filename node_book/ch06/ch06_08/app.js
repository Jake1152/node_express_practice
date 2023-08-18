const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(__dirname, 'public'));
app.use(morgan('dev'));
app.use(cookieParser('jakepwd'));
app.use(session({
    resave:false,
    saveUninitialized: false,
    secret: 'jakepwd',
    cookie: {
        
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    /**
     * 요청을 보낸사람의 id만 hello가 된다.
     * 요청마다 개인의 저장공간을 만들어준다.
     * 그것이 express-session.
     */
    req.session.id = 'hello';
    // heap
    // 가비지 컬랙터에 걸릴지 
    // 메모리 누수가 날 수 있지는 않은지
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
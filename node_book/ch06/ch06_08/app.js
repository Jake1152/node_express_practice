const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cookieParser('jakepwd'));
app.use(session({
    resave:false,
    saveUninitialized: false,
    secret: 'jakepwd',
    cookie: {
        httpOnly: true, // true여야 JS로 공격을 받지 않는다? http로만 받아지니까 그런 것 같다
    },
    /**
     * 서명되어 있으니 읽을 수 없는 문자열로 바뀌어 있다
     */
    name: 'connect.sid', // default value => connect.sid
}));

/**
 * express-static을 다른 곳에 넣는다고 했을때
 * 로그인 한 사람한테만 특정 자원을 제공한다고 할때
 *  e.g) 구글 드라이브, 등 공유자원, 
 * 미들웨어 속에 미들웨어를 넣는 식으로 처리할 수 있다.
 */
// AS IS
app.use('/', express.static(__dirname, 'public'));
// TD BE 미들웨어 확장, cors, passport 미들웨어 쓸때에도 미들웨어 확장법을 쓰게된다.
app.use('/', (req, res, next) => {
    // login한 경우
    if (req,sessino.id) { 
        express.static(__dirname, 'public');
    } else {
        next();
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res, next) => {
//     /**
//      * 요청을 보낸사람의 id만 hello가 된다.
//      * 요청마다 개인의 저장공간을 만들어준다.
//      * 그것이 express-session.
//      */
//     req.session.id = 'hello';
//     // heap
//     // 가비지 컬랙터에 걸릴지 
//     // 메모리 누수가 날 수 있지는 않은지
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

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
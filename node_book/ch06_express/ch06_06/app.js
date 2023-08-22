const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

app.set('port', process.env.PORT || 3000);

/**
 * dev
 */
// app.use(morgan('dev'));

/**
 * release
 * combined 장점: 좀더 정확하게 정보가 주어진다.
 * IP,Browser
 */
app.use(morgan('combined'));
app.use(cookieParser());
// app.use(cookieParser('blahblah')); // 암호화 가능
/**
 * body parser() 예전 방식, 이제는 bodyparser가 express안으로 들어갔다.
 * http와 비교 추천
 * 좋은점
 * http객체처럼 req.on()쓰면서 길게 할 필요없이 
 * 알아서 데이터가 파싱된다
 * req.body.name과 같이 바로 쓸 수 있다
 * http 객체에서는 name을 가져오기 위해 파싱해야하는 과정이 필요 했었다.
 * json, urlencoded
 * json => client에서 json데이터를 보냈을때 파싱해서 req.body로 넣어준다.
 * urlencoded => form parsing, formusbmit
 * extended: true하면 qs, false면 querystring
 * qs가 
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * body parser에는 있지만 express는 없는 두가지
 * boadyParser.raw()
 * bodyParser.text()
 * 두 개가 잘 안쓰여서 express에 안들어간 것 같다고 한다.
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
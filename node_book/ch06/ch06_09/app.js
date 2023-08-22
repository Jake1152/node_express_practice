const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');

/**
 * 서버 시작 이전이라 sync 사용해도 무방함
 */
try {
    fs.readdirSync('uploads');
} catch(error) {
    console.error('There are no directory.\nSo, create new directory');
    fs.mkdirSync('uploads');
}

const app = express();
/**
 * multer의 아래 항목은 어디에다 어떻게 올릴지를 지정
 * storage: 업로드한 파일을 어디에 저장할지 지정가능
 *  - disk, memory등 저장 위치 지정가능
 *  보통은 disk에 저장하며 memory에 저장하는 경우는 극히 드물다고한다.
 *  잠깐 데이터 옮기는 용도로 사용
 *  S3, google에 storage에도 저장 가능
 * limits: 파일 사이즈 제한
 */
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/'); // uploads 디렉토리 필요
        },
        /**
         * 어떤 이름으로 올릴지 지정
         * done()에 첫번째 인자는 보통 null로 지정
         * null이 아닐떄는 error처리 미들웨어로 넘길때 주로 사용
         * 두번쨰 인자에는 값을 넣어준다.
         */
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    // file size, file 개수 아래에서는 5MB만큼 저장가능
    limits: { fileSize: 5 * 1024 * 1024},
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});

// upload 객체를 미들웨어랑 라우팅되는 지점이랑 두 곳에서 쓰면 안되는가?
// app.use(upload.array('image'));
/** single() 한개의 파일만 업로드할때 사용
 * 업로드 정보를 req.file에 저장가능
 */
// app.post('/upload', upload.single('image'), (req, res) => {
/** array() 여러개 파일 전송*/
app.post('/upload', upload.array('image'), (req, res) => {
    console.log(req.files);
    res.send('ok');
});

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

app.use('/', (req, res, next) => {
    // login한 경우
    if (req.session.id) { 
        console.log(path.join(__dirname, 'public'));
        console.log(express.static(path.join(__dirname, 'public')));
        res.send("hello");
    } else {
        next();
    }
});
/**
 * 데이터 전송 라우터에서만 써도 될것이라 판단
 * 만드는 사람이 어디에 놓을지 판단하여 자유롭게 자정
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
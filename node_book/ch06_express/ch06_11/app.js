const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'pug');

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, // true여야 JS로 공격을 받지 않는다? http로만 받아지니까 그런 것 같다
    },
    name: 'connect.sid', // default value => connect.sid
}));

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});
// error 처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err);
    res.status(200).send('error 발생, 하지만 status code로 알려주지는 않는다.');
})

app.listen(app.get('port'), () => {
    console.log('server listen ' + app.get('port') + " port");
    console.log(process.env.COOKIE_SECRET);
});
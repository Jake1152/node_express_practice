const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('port', process.env.PORT || 3000);


/**
 * about에서만 실행되게하는 미들웨어 route
 * 미들웨어를 여러개 동시에 줄수도 있다.
 * next()가 있다면 다음 미들웨어로 흐름이 이어진다.
 * 쓰는 경우가 있기는 하다, 추후 언급 예정
 */
app.use( (req, res, next) => {
    console.log("# This is middle-ware, All of every request will be passed.")
    // error는 내장객체
    next();
    next(error);
}
// , (req, res, next) => {
//     // console.log('# Second middle-ware in /about endpoint')
//     // next();
    // throw new Error('Occured error');
);

/**
 * 한 헤더에서 여러번 응답 보내면 error발생
 * 요청에 대한 응답은 한번.
 */
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'index.html'));
    // res.send("안녕하세요");
    res.json({ hello: 'jake'});
});

app.post('/', (req, res) => {
    res.send('hello express!');
});

/**
 * res.status(200).send('hello Javascript!');
 * == res.send('hello Javascript!');
 * .status(STATUS_CODE)가 기본적으로 붙는다. 200은 default로 들어간다.
 */
app.get('/catagory/Javascript', (req, res) => {
    try {
        res.send('hello Javascript!');

    } catch (error) {
    // } catch {
        next(error);
        // throw new Error('something wrong');
    }
});

app.get('/category/:name', (req, res) => {
    res.send('hello wildcard');
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

// app.get('*', (req, res, next) => { 
//     console.log('* wildcard');
//     res.send('hello everybody');
//     next();
// });

/**
 * error 미들웨어가 아닌
 * 다른 status code값 처리 미들웨어
 */
app.use((req, res, next) => {
    res.status(404).send('## error in e middle-ware');
})
/**
 * (err, req, res, next) 인자 개수를 맞추어야한다.
 * 실제 서비스에게는 사용자에게 에러 발생했다고 정도만 알려준다(상세정보 제외)
 * 서버에서만 자세하게 기록한다.
 */
// Cannot /route 
app.use((err, req, res, next) => {
    console.error(err);
    // status code masking, 원래는 500번대 에러이지만 해커들의 공격을 방어하기 위함
    res.status(400).send('## error in error handle middle-ware');
})

app.listen(app.get('port'), () => {
    console.log("Excute express server");
});

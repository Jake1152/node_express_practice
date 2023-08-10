const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// setting
app.set('port', process.env.PORT || PORT);

// middle-ware
app.use((req, res, next) => {
    console.log('첫번째 요청에 실행');
    // next()의 인자가 없을때만 다음 미들워어로 바로 실행 흐름이 넘어간다.
    next();
}, (req, res, next) => {
    // throw new Error();
    try {

    } catch (err) {
        next(err);
    }
});
// app.all();
// app.next();

// routes
app.get('/', (req, res) => {

    /**
     * http module
     */
    // res.writeHead(200, {'Content-Type': 'application/json'});
    // res.end(JSON.stringify({greeting: 'jake'}));
    /**
     * express module(It also concreate by http module)
     */
    res.json( {greeting: 'jake'});
    // res.render(); // 응답 보낼때 사용
});

// routes with wildcard
// app.get('/cate/:name', (req, res) => {
//     console.log('wildcard');
//     res.send('wildcard');
// });

/**
 * '*' wildcard는 하위 디렉토리 경로들에도 적용된다.
 */
// app.get('/cate/*', (req, res) => {
//     console.log('wildcard');
//     res.send('wildcard');
// });


app.use((req, res, next) => {
    console.error(err);
    res.status(420).send('error handle');
});

// error middle-ware 
app.use((err, req, res, next) => {
    console.error(err);
    res.status(400).send('error handle in error middle-ware');
});

// 
app.listen(app.get('port'), () => {
    console.log('Listen~');
});
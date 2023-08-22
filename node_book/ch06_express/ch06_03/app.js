const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);

// be used middle-ware
app.use((req, res, next) => {
    console.log('I want to execute all of requires!!');
    // next()가 있어야 middle-ware 다음으로  동작이 넘어간다.
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * wildcard가 다른 미들웨어보다 위에 있으면 wildcard에 먼저걸리고서 실행흐름이 끝나므로
 * wildcard를 다른 미들웨어 밑으로 위치시켜야한다.
 * 그래야지만 의도한대로 동작한다.
 */
app.get('/category/:name', (req, res) => {
    // 변수를 쓰고 싶다면 backtic필요
    res.send(`Hello ${req.params.name}`);
    // res.send("Hello wildcard");
});

app.get('/category/Js', (req, res) => {
    // 변수를 쓰고 싶다면 backtic필요
    res.send(`Hello JS!!`);
    // res.send("Hello wildcard");
});

app.post('/', (req, res) => {
    res.send('Hello express!');
});

app.get('/about', (req, res) => {
    console.log('/about');
    res.send('Hello express');
});

app.get('*', (req, res) => {
    // 변수를 쓰고 싶다면 backtic필요
    res.send(`Hello everyone. This is asterisk wildcard`);
    // res.send("Hello wildcard");
});

app.listen(app.get('port'), () => {
    console.log('Excute express server')
});
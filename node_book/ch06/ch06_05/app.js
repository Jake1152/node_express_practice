const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// # setting
app.set('port', process.env.PORT || PORT);

// # middle-ware
// app.use();
// app.all();
// app.next();

// # routes METHOD && ENDPOINT
// app.

// ## routes with wildcard
/**
 * 
 */


// error handling 
app.use((err, req, res, next) => {
    console.error
});

// 

app.get('/', (req, res) => {
    console.log("/ path.");
    res.send("hello");
});


app.listen(app.get('port'), () => {
    console.log('Listen~');
});
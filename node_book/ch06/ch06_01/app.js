const express = require('express');

const app = express();

// app.set('port', 3000);
app.set('port', process.env.PORT || 3000);
app.get('/', (req, res) => {
    res.send("Hello express");
});

app.get('/about', (req, res) => {
    res.send("hello express");
});

app.listen(3000, () => {
    console.log("Execute express server.");
});
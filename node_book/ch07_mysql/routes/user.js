const express = require('express');
const router = express.Router();

// GET /user 라우터 
router.get('/', (req, res) => {
    res.send('Hello, User');
});

// GET /user 라우터 
router.get('/list', (req, res) => {
    res.send('Hello, User List');
});

module.exports = router;


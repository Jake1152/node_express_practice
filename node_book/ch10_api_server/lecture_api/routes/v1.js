const express = require("express");
const { verifyToken } = require("../middlewares");
const { createToken, tokenTest } = require("../controllers/v1");
const router = express.Router();

// /v1/token
/**
 * 토큰 발급을 위해서는 client secret이 필요하다.
 * client secret은  req.body를 통해서 전달된다.
 * req.body.clientSecret
 */
router.post("/token", createToken);
router.get("/test", verifyToken, tokenTest);

module.exports = router;

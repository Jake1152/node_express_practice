const express = require("express");
const {
  verifyToken,
  apiLimiter,
  premiumApiLimiter,
} = require("../middlewares");
const {
  createToken,
  tokenTest,
  getMyPosts,
  getPostsByHashtag,
} = require("../controllers/v2");
const router = express.Router();

// /v1/token
/**
 * 토큰 발급을 위해서는 client secret이 필요하다.
 * client secret은  req.body를 통해서 전달된다.
 * req.body.clientSecret
 */

/**
 * 회원정보에 따라 다르게 표현
 */
router.post("/token", apiLimiter, premiumApiLimiter, createToken);
router.get("/test", apiLimiter, verifyToken, tokenTest);

router.get("/posts/my", apiLimiter, verifyToken, getMyPosts);
router.get("/posts/hashtag/:title", apiLimiter, verifyToken, getPostsByHashtag);

module.exports = router;

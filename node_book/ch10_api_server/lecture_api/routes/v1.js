const express = require("express");
const { verifyToken, deprecated } = require("../middlewares");
const {
  createToken,
  tokenTest,
  getMyPosts,
  getPostsByHashtag,
} = require("../controllers/v1");
const router = express.Router();

/**
 * deprecated 미들웨어를 일일이 넣는 방식
 */
// router.post("/token", deprecated, createToken);
// router.get("/test", deprecated, verifyToken, tokenTest);

// router.get("/posts/my", deprecated, verifyToken, getMyPosts);
// router.get("/posts/hashtag/:title", deprecated, verifyToken, getPostsByHashtag);

/**
 * 미들웨어가 모든 라우터에 공통적용되는 경우 일일이 넣지 않고 처리할 수 있다.
 */
router.use(deprecated);

// /v1/token
/**
 * 토큰 발급을 위해서는 client secret이 필요하다.
 * client secret은  req.body를 통해서 전달된다.
 * req.body.clientSecret
 */
router.post("/token", createToken);
router.get("/test", verifyToken, tokenTest);

router.get("/posts/my", verifyToken, getMyPosts);
router.get("/posts/hashtag/:title", verifyToken, getPostsByHashtag);

module.exports = router;

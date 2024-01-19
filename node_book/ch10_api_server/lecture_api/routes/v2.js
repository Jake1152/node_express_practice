const express = require("express");
const {
  verifyToken,
  apiLimiter,
  corsWhenDomainMatches,
} = require("../middlewares");
const {
  createToken,
  tokenTest,
  getMyPosts,
  getPostsByHashtag,
} = require("../controllers/v2");
const cors = require("cors");

const router = express.Router();

// /v1/token
/**
 * 토큰 발급을 위해서는 client secret이 필요하다.
 * client secret은  req.body를 통해서 전달된다.
 * req.body.clientSecret
 */

/**
 * cors 모둘 사용, 클라이언트 주소가 유저마다 다른 것에 대해 유연하게 대처하는 방법
 * 미들웨어 확장패턴 적용 버젼
 */
router.use(corsWhenDomainMatches);

/**
 * cors 모듈을 이용한 해결방법
 * 일일이 에러 케이스 맞추지 않아도 처리할 수 있다.
 * 사람마다 origin주소가 다를 것이다. 어떤 주소에서 접근할 수 있게 허용할 것인가?
 * 미들웨어 확장패턴을 다시 쓴다
 *  사람마다 다른 것이 포인트!
 */
router.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true, // cookie도 같이 처리
    /**
     * origin: * 으로 쓰면 와일드카드 처리되어서 모든 주소로부터의 요청을 가능하게 하지만
     * credential을 같이 쓰면 "origin: *"같은 와일드카드를 쓸 수 없다.
     * 이런 경우 아래와 같이 처리할 수 있다
     * origin: true,
     * credentials: true
     */
  })
);

/**
 * cors 에러 직접적으로 해결하는 방법
 */
// router.use((req, res, next) => {
//   // res.setHeader("Access-Control-Allow-Origin", "http://localhost:4400");
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
//   res.setHeader("Access-Control-Allow-Headers", "content-type");
//   next();
// });

/**
 * 회원정보에 따라 다르게 표현
 */
router.post("/token", apiLimiter, createToken);
router.get("/test", verifyToken, apiLimiter, tokenTest);

router.get("/posts/my", verifyToken, apiLimiter, getMyPosts);
router.get("/posts/hashtag/:title", verifyToken, apiLimiter, getPostsByHashtag);

module.exports = router;

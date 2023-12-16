const express = require("express");
const router = express.Router();
const {
  renderJoin,
  renderMain,
  renderProfile,
} = require("../controllers/page");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

/**
 * 로그인 여부에 따라서 req.user가 null이거나 값이 있거나 달라진다
 */
router.use((req, res, next) => {
  // res.locals.user = null;
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followingIdList = []; // debug version
  // res.locals.followingIdList = {}; // error
  next(); // next() 뺴먹기 쉬우므로 주의!
});

// router.get("/profile", renderProfile);
/**
 *  profile은 로그인해야지만 넘어갈 수 있다
 */
router.get("/profile", isLoggedIn, renderProfile);
router.get("/join", isNotLoggedIn, renderJoin); // 로그인 안한 사람은 회원가입 가능하게 처리
router.get("/", renderMain);

module.exports = router;

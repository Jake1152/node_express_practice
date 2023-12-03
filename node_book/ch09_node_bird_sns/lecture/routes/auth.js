/**
 * Before
 * const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/auth/login", passport.authenticate("local"), () => {
  req.login();
});

module.exports = router;

 */

// After
const express = require("express");
const passprot = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { join, login, logout } = require("../controllers/auth");
const router = express.Router();

/**
 * 로그인 한 사람 안한 사람에 따라 다르게 처리되어야하므로
 * 관련된 부분을 별도 미들웨어로 처리한다
 */
// POST /auth/join
// auth + /join
router.post("/join", isNotLoggedIn, join);
// POST /auth/login
router.post("/login", isNotLoggedIn, login);
// GET /auth/logout
router.get("/logout", isLoggedIn, logout);
module.exports = router;

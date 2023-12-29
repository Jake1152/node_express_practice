const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares");
const { follow, unfollow } = require("../controllers/user");

// 생성
router.post("/:id/follow", isLoggedIn, follow);
// 변경
// delete?
router.delete("/:id/follow", isLoggedIn, unfollow);

module.exports = router;
// TODO  follow 취소 추가

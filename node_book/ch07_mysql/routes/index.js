const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render("sequelize", { users }); //sequelize.html을 가져오게 만듦
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
/** 

// GET / 라우터
router.get("/", (req, res) => {
  // res.send('Hello, Express');
  // render()로 하면 views 디렉토리 안으로 찾는다
  res.render("index", { title: "Express" });
});

// res.locals객체에 넣는 것도 가능
router.get("/", (req, res) => {
  // res.send('Hello, Express');
  res.locals.title = "Express";
  res.render("index", { title: "Express" });
});

module.exports = router;
 */

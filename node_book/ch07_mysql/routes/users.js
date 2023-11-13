const express = require("express");
const User = require("../models/user");
const Comment = require("../models/comment");

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

/**
 * 1. 댓글 중에 user id가 맞는 것 모두를 가져온다
 * 2. user id가 맞는 것 중 댓글을 모두 가져온다?
 * 모든 댓글을 가져오려는 것인데 거꾸로 바꾸어서 하는 것이 가능한가?
 * join inner, outer
 */
router.get("/:id/comments", async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
        // required: false,
      },
    });
    // const user = awaitU User.findOne
    // const comments = await User.findOne({
    //   include: {
    //     model: Comment,
    //     where: { id: req.params.id },
    //   },
    // });
    console.log(`#comments : ${comments}`);
    console.log(`#JSON.stringify(comments) : ${JSON.stringify(comments)}`);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

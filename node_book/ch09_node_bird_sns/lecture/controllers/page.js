// const Post = require("../models/post");
// const User = require("../models/user");
const { User, Post, Hashtag } = require("../models");

exports.renderProfile = (req, res, next) => {
  res.render("profile", { titile: "내 정보 - NodeBird" });
};

exports.renderJoin = (req, res, next) => {
  res.render("join", { titile: "회원가입 - NodeBird" });
};

/**
 * 유저 정보 클라이언트로 전송할 때 보안상 문제될 데이터 안보내도록 주의!
 */
exports.renderMain = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.render("main", { titile: "NodeBird", twits: posts });
  } catch (err) {
    console.error(err);
  }
};

/**
 * 계층적 호출
 * 라우터 -> 컨트롤러 -> 서비스(요청, 응답 모름)
 */

exports.renderHashtag = async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect("/");
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }

    return res.render("main", {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

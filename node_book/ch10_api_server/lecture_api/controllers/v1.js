const jwt = require("jsonwebtoken");
const { Domain, User, Post, Hashtag } = require("../models");
// const { renderHashtag } = require("../../lecture/controllers/page");
/**
 * 토큰 발급에는  req.body에 아까 발급받은 client secret을 통해서 jwt을
 */
exports.createToken = async (req, res) => {
  // const clientSecret = req.body.clientSecret || null;
  const { clientSecret } = req.body;
  // console.log(`#clientSecret: ${clientSecret}`);
  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      // domain 소유자 찾기
      include: {
        model: User,
        attributes: ["nick", "id"],
      },
    });
    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: "Invalid token.",
      });
    }
    /**
     * 토큰 생성, 토큰 내용을 넣을 수 있다.
     * jwt secret만 잘되어있다면 위조될일이 없다.
     * 유효기간명시 필요
     * - jwt에 많은 옵션들은 공식문서 확인 필요
     */
    const token = jwt.sign(
      {
        id: domain.User.id,
        nick: domain.User.nick,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10m", issuer: "nodebird" }
    );
    return res.status(200).json({
      code: 200,
      message: "Issued token.",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "Server error.",
    });
  }
};

/**
 * 프론트에 표시해주는 간단한 역할만 담당
 */
exports.tokenTest = async (req, res) => {
  res.json(res.locals.decoded);
};

// Promise 이용하여 처리
/**
 * post를 가져온다.
 * DB에 접근하여 가져와야함
 * 가져오기 위해서는 id가 필요
 */
exports.getMyPosts = (req, res) => {
  try {
    Post.findAll({
      // where: { userId: req.body?.id },
      // verify token에서 쓰였다
      where: { userId: req.locals.decoded.id },
      // include: { model: Post, attributes: ["PostId"] },
    })
      .then((posts) => {
        console.log(posts)
        res.json({
          code: 200,
          payload: posts,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          code: 500,
          message: "server error",
        });
      });
    if (!posts) {
      return;
    }
  } catch (err) {}
};

exports.getPostsByHashtag = async (req, res) => {
  // const post = finc;
  try {
    // 왜 params인가?
    // router.get("/posts/hashtag/:title", verifyToken, getPostsByHashtag);
    // /posts/hashtag/:title에 title이 들어있을 것이므로 그렇다
    const hashtag = await Hashtag.findOne({
      where: { title: req.params.title },
    });
    if (!hashtag)
      return res.status(404).json({
        code: 404,
        message: `No results for ${req.params.title}`,
      });
    const posts = await hashtag.getPosts();
    if (posts.length === 0) {
      return res.status(404).json({
        code: 404,
        message: `No results for ${req.params.title}`,
      });
    }
    if (posts)
      return res.json({
        code: 200,
        payloads: posts,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "Server error",
    });
  }
};

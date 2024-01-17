const jwt = require("jsonwebtoken");
const User = require("../models/user");
const rateLimit = require("express-rate-limit");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // parrposrt통해서 로그인 했는지 확인
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

/**
 * exports 앞에 변수 선언 키워드가 없는 이유?
 * 콜백 함수라서?
 * 콜백 함수는 맞는가?
 * 찾아보니 exports는 node js에 내장된 객체이다
 */
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다");
    res.redirect(`/?error=${message}`); //localhost:8001?error =메시지
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    console.log("# exports.verifyToken");
    // token이 들어있는 위치 req.headers.authorization
    // token이 꼭 이 위치에 들어 있는 것은 아니다
    // 개발자가 사용자한테 토큰을 이 객체의 이 프로퍼티에 넣으라고 할 수 있다.
    // process.env.JWT_SECRET는 인감도장과도 같다.
    // res.locals.decoded에는 검사가 끝난 내용물을 담는다.
    res.locals.decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // 다음 미들웨어로 실행 흐름 진행
    return next();
  } catch (error) {
    // token이 틀렸거나 유효기간이 지난 경우의 처리
    // 유효기간 처리
    /**
     * error status code의 경우 Front와 협의하에 처리됨
     */
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        // 419 Page Expired
        // indicates that the request failed because the session has expired
        code: 419,
        message: "Token 유효기간 초과",
      });
    }
    return res.status(401).json({
      // 401 Unauthorized
      code: 401,
      message: "Token 유효기간 초과",
    });
  }
};

/**
 * 미들웨어 확장패턴 적용 이전 버젼
 */
// exports.apiLimiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 10,
//   handler(req, res) {
//     res.status(this.statusCode).json({
//       code: this.statusCode,
//       message: "1분에 10번 요청 가능",
//     });
//   },
// });

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: async (req, res) => {
    if ((await req.user?.type) === "premium") {
      console.log(`#req.user.type : ${req.user.type}`);
      return 100;
    }
    console.log(`#req.user : ${req.user}`);
    return 10;
  }, //user?.type === "preminum" ? 1 : 1,
  handler(req, res) {
    console.log(req.user);
    console.log(req.rateLimit);
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: `1분에 ${limiter["max"]}번 요청 가능`,
    });
  },
});

/**
 * 미들웨어 확장 패턴 적용 버젼
 */
exports.apiLimiter = async (req, res, next) => {
  let user;
  if (res.locals.decoded) {
    user = await User.findOne({ where: { id: res.locals.decoded } });
  }
  req.user = user;
  limiter(req, res, next);
};

exports.deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: "새로운 버젼이 나왔습니다. 이전 버젼은 지양해주세요",
  });
};

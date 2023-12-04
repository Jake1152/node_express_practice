const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
/**
 * 회원가입 작성
 */
exports.join = async (req, res, next) => {
  const { nick, email, password } = req.body;
  try {
    // async, await
    const exUser = await User.findOne({ where: { email } });
    console.log(`exUser: ${exUser}`);
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12); // bcrypt 앞에 await 붙는 이유?
    await User.create({ nick, email, password: hash });
    return res.redirect("/"); // 302 status code
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * 로그인하고 localstrategy를 사용
 * 아래와 같은 패턴이 미들웨어 확장 페턴이라고 한다
 */
// POST /auth/login
exports.login = (req, res, next) => {
  // LocalStrategy에서 done()이 실행되면 authenticate() 2번째 인자의 함수로 실행흐름이 넘어간다
  // done{서버실패, 성공유저, 로직실패) 이 아래 2번째 함수 인자로 들어간다
  passport.authenticate("local", (authError, user, info) => {
    // 서버 실패
    if (authError) {
      console.error(authError);
      return next(authError); // error 처리 미들웨어에서 처리하도록 next로 넘겨준다
    }
    // 로그인 실패
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    // 로그인 상공
    return req.login(user, (loginError) => {
      // 로그인 과정에서의 에러처리
      // 노드의 경우 에러 발생시 종료되므로 세심하게 에러 처리 필요
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next); //  이 부분까지 적으면 미들웨어 확장패턴이라 한다
};

/**
 * 로그아웃은 세션 쿠키를 제거함
 * 브라우저에서 connect.sid 쿠키값이 남아있더라도
 * 서버에서 connect.sid가 없으므로 로그인이 안된다.
 * deserializeUser를 할 수 없다
 * 로그아웃의 역할은 세선쿠키와 유저아이디와의 연결을 없애버린다.
 * { 123123: 1}
 */
exports.logout = (req, res, next) => {
  req.logout(() => {
    res.redirect("/");
  });
};

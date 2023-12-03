const passport = require("passport");
/**
 * local로 호출되었다면 localstrategy가 호출된다.
 * 별도 파일에 정의 된것이 import되어서 실행된다.
 */
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

/**
 * user로부터 user ID만 꺼내서 저장
 */
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(() => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local(); // routes에서 local이 있으면 이 부분이 호출된다.
};

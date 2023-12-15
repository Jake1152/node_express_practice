const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const User = require("../models/user");
const bcrypt = require("bcrypt");
// const express = require("express");
/**
 *  local 로그인으로 들어오는 경우 로그인 시켜도 되는지 이 부분에서 판단해서 넘겨준다
 * 로그인 시켜도 된다고 판단이 되었다면 /routes/auth.js로 넘어간다.
 */
// localStrategy는 email로그인할 때 어떻게 할지를 의미
module.exports = () => {
  /**
   * 객체 key 오른쪽에 있는 value값들을 기준으로 처리하겠다는 의미
   * usernameField로는 email을 받겠다
   * passwordField로는 password를 받겠다 등등
   */
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // req.body.email
        passwordField: "password", //req.body.passpword
        passReqToCallback: false,
        // passReqToCallback: true, //true일때는 LocalStrategy 2번쨰 인자로 들어가는 함수의 인자가 늘어난다
        // -> #AS IS async(email.password, done) #TOBE async(req, email.password, done)
        // 그런데 왜 req가 들어가는가?
      },
      async (email, password, done) => {
        // done{서버실패, 성공유저, 로직실패
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              // 로그인 성공
              done(null, exUser);
            } else {
              // 로그인 실패
              done(null, false, { message: "비밀빈호가 일치하지 않습니다" });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다" });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};

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
    // user === exUser
    done(null, user.id); // user id만 추출
  });
  // 세션객체 형식 { 23443543543: 1 }
  // 오른쪽과 같은 형태이다 { sessionCookie: userId}, 메모리에 저장된다.
  // 유저정보를 다 저장하게되면 메모리가 너무 커진다, 유저가 수십, 수백만인 경우 부담이 커짐, 서버가 터질 수 있다
  // userId만 저장한다 { 세션쿠키: 유저아이디 }
  // 하지만 메모리에 저장된다는 것은 문제가 있다, 여전히 터질 수 있고

  // 서버가 여러대인 경우 서로를 모른다
  // 이 문제를 해결하기 위해 공유된 메모리 방식을 사용한다

  /**
   * 브라우저로부터 받은 세션쿠키 정보를 이용해서 { 세션쿠키: 유저아이디 }객체에서 유저아읻를 찾는다
   * 찾은 유저아이디를 통해서 유저 정보를 복권 시킨다
   * 한번 복원된 다음에는 아래 과정을 거쳐서 req.user를 쓸 수 있다
   */
  passport.deserializeUser((id, done) => {
    // id: 1
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followings",
        }, // 팔로잉
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followers",
        }, // 팔로워
      ],
    })
      .then((user) => done(null, user)) // 복원된 유저가 req.user가 된다.
      .catch((err) => done(err));
  });

  local(); // routes에서 local이 있으면 이 부분이 호출된다.
  kakao();
};

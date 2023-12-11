const passport = require("passport");
const { Strategy: KakaoStrategy } = require("passport-kakao");

const User = require("../models/user");

module.exports = () => {
  /**
   * 공식문서를 통한 내용 파악 필요
   */
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        /**
         * accessToken, refreshToken 카카오 API호출하는 용도이며,
         * 카카오에서 보내주는 인자들이다
         * 강의에서는 쓰지 않는다
         * - profile
         *  사용자 정보
         *  카카오에서 설정하기에 따라 값들이 바뀌므로 확인이 필요하다
         */
        console.log("#profile: ", profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json?.kakako_account?.email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};

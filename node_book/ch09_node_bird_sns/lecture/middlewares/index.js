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

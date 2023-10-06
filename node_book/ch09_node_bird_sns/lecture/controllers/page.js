exports.renderProfile = (req, res, next) => {
  res.render("profile", { titile: "내 정보 - NodeBird" });
};

exports.renderJoin = (req, res, next) => {
  res.render("join", { titile: "회원가입 - NodeBird" });
};

exports.renderMain = (req, res, next) => {
  res.render("main", { titile: "NodeBird", sns: [] });
};

/**
 * 계층적 호출
 * 라우터 -> 컨트롤러 -> 서비스(요청, 응답 모름)
 */

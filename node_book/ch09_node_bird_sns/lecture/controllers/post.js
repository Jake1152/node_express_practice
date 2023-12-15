const { Post } = require("../routes/post");

/**
 * 이미지 업로드 하는 겨웅
 * single()을 써도 아래와 같이 처리된다.
 */
exports.afterUploadImage = (req, res) => {
  console.log("req.file : ", req.file);
  res.json({ url: `/img/${req.file.filename}` });
};

/**
 * req.body.content
 * req.body.url을 쓸 수 있다
 * 사용자 객체를 req.user.id를 통해 알 수 있다.
 */
exports.uploadPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * 다른 방법 
 * { }안에 UserId 속성을 넣는 것이 아니라 
 * 밖에다가 post객체에 연결해서 쓸 수 있다
 * query를 두번 날린다
 */
exports.uploadPost = async (req, res, next) => {
  try {
    // 게시글 예시, node express 강의 완강!
    // 문자열에서 특정 패턴 추출하려면 regex가 가장 적합
    // hash tag 정규 표현식 /#[^\s#]*/g
    // /#[^\s#]*/g -> #의로 시작, ^ -> 아니다, \s -> space,
    // [^\s#] -> #, 공백이 아니다\
    // /g -> Global의 표현 대상 문자열 내에 모든 패턴을 검색하는 것을 의미한다
    const post = await Post.creat({
      content: req.body.content,
      img: req.body.url,
    });
    await post.addUser(req.user.id);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

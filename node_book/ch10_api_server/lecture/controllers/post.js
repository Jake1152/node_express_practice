const Post = require("../models/post");
const Hashtag = require("../models/hashtag");

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
    const hashtags = req.body.content.match(/#[^#\s]*/g);
    console.log("## hashtags : ", hashtags);
    /**
     * 입력값이 중복인 경우 에러 발생!!
     */
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          // console.log("#tag : ", tag);
          // 디비와 연결해서 값을 받아오고 이후 코드를 진행해야하니까 await을 붙여주어야 처리된다.
          // Hashtag.~~ 부분이 promise이다
          // map()을 썼으니 배열이고 그 안에 값들은 promise이므로
          // .map()의 결과는 promise 배열이다
          const slicedTag = tag.slice(1).toLowerCase();
          // console.log("## tag.slice(1).toLowerCase() :", slicedTag);
          // console.log(
          //   "## slicedTag ? slicedTag : #test :",
          //   slicedTag ? slicedTag : "#test",
          // );

          return Hashtag.findOrCreate({
            where: { title: slicedTag },
          });
        }),
      );
      console.log("#result : ", result);
      // hashtag와 post와 서로 이어준다.
      // post, hashtag 다대다 관계가 아래와 같이 생긴다
      await post.addHashtags(result.map((r) => r[0]));
    }
    res.redirect("/");
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
// exports.uploadPost = async (req, res, next) => {
//   try {
//     // 게시글 예시, node express 강의 완강!
//     // 문자열에서 특정 패턴 추출하려면 regex가 가장 적합
//     // hash tag 정규 표현식 /#[^\s#]*/g
//     // /#[^\s#]*/g -> #의로 시작, ^ -> 아니다, \s -> space,
//     // [^\s#] -> #, 공백이 아니다\
//     // /g -> Global의 표현 대상 문자열 내에 모든 패턴을 검색하는 것을 의미한다
//     const post = await Post.create({
//       content: req.body.content,
//       img: req.body.url,
//     });
//     await post.addUser(req.user.id);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };

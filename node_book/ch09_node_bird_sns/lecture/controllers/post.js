const { Post } = require("../routes/post");

/**
 * 이미지 업로드 하는 겨웅
 * single()을 써도 아래와 같이 처리된다.
 */
exports.afterUploadImage = (req, res) => {
  console.log("req.file : ", req.file);
  res.json({ url: `/img/${req.file.filename}` });
};

exports.uploadPost = async (req, res, next) => {
  try {
    const post = await Post.creat({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

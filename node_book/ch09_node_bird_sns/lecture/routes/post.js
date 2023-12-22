const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares/");
const { afterUploadImage, uploadPost } = require("../controllers/post");

/**
 * 디렉터리가 있는지 확인하는게 아니라 없으면 제거한느게 맞는가?
 * 디렉터리가 없는 경우는 한번만 일테니 더 나은 코드인가?
 * 더 낫다의 기준을 어떻게 테스트 할 수 있는가?
 */
try {
  fs.readdirSync("uploads");
} catch (error) {
  fs.mkdirSync("uploads");
}

/**
 *multer option
 */
const upload = multer({
  storage: multer.diskStorage({
    // 두번째 인수에 값이 들어가는 이유?
    destination(req, file, cb) {
      // console.log("file: ", file);
      cb(null, "uploads/");
    },
    /**
     * 파일 이름이 같지만
     * 최신 파일이 이전 파일을 덮어쓰여버린다
     * cb()는 어디로 넘겨주는, 어떤 함수인가
     */
    filename(req, file, cb) {
      //   console.log("req: ", req);
      // console.log("file: ", file);
      const ext = path.extname(file.originalname); // 이미지.png => 이미지123234435.png
      // 이름만 떼어주기 path.basename() 이용!
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/**
 * 처음에는 틀을 만든다
 * 로그인한 사람만 할 수 있게 처리 필요
 * - 브라우저 뿐만 아니라 client는 다른 것도 될 수 있으므로 항상 서버에서 방어 필요 *
 */
router.post("/img", isLoggedIn, upload.single("img"), afterUploadImage);

/**
 * 설정이 달라서 재사용하지 않고 multer 객체를 두개를 만들었다
 * 이미지를 올리지 않으므로 none()으로 처리
 */
const upload2 = multer();
router.post("/", isLoggedIn, upload2.none(), uploadPost);

module.exports = router;

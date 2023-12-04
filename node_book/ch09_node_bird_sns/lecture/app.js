const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");
const { sequelize } = require("./models");

// 실행순서 중요, dotenv.config()를 해야 .env를 읽어서 process.env에 담긴다
dotenv.config(); // process.env
const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const passportConfig = require("./passport");

const app = express();
passportConfig();
app.set("port", process.env.PORT || 4242);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// 혹시나 개발할때 테이블을 잘못 만들었다면
// sync(force: true)를 하면 이전 테이블을 날리고 새롭게 만들게된다.
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev")); // 배포시에는 'conbined', dev하면 자세하게 나오지만 서비스 시에 자세히 나오면 log가 많아서 비용이 커짐
app.use(express.static(path.join(__dirname, "public")));
// 보안상의 이슈로 public만 접근 가능하게하고 나머지는 접근 못하게 만듦
// public을 static으로 설정
app.use(express.json()); // req.body를 ajax json요청으로부터 생성
app.use(express.urlencoded({ extended: false })); // req.body 폼으로부터 생성
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false, // https로 바꿀때는 true로 변경
    },
  })
);
// passport middle-ware
/**
 * 반드시 express session 밑에다가 해야한다고 한다
 * 왜?
 * passport.session에서 express session을 쓰므로 미리 express session을 정읭해야한다
 */
app.use(passport.initialize()); // req.user, req.login, req.isAuthenticate, req.logout
app.use(passport.session()); // session으로 저장 connect.sid라는 이름으로 세션 쿠키가 브라우저로 전송
// 이로써 로그인 완료됨
// 브라우저 connext.sid=23443543543 처럼 저장됨
/**
 * 이 이후부터는 쿠키가 저장되면 다음 리턴부터는 쿠키가 같이 전송된다.
 * 23443543543이 서버로 온다
 * 쿠키 파서가 분석을 한다
 * connect.sid를 쿠카퍼서 역할
 * 객체로 만들어준다
 * passport에서  세션쿠키를 이용해서 { 세션쿠키: 유저아이디}객체를 찾는다
 */

app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${res.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});
/**
 * 에러 메시지를 그대로 노출시키는 것도 보안상 문제가 될 수 있다
 * - 로그에 남으니까 보고서 추정할 수 있다
 * 배포모드일때는 오히려 에러를 숨긴다고 한다
 * 배포모드일때는 에러는 화면에 표시하지 않는다.
 */
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {}; // 에러 로그를 서비스한테 넘긴다.
  res.status(err.status || 500);
  res.render("error"); // 화면에 표시된다.
  /**
   * res.render('error")는
   * views 폴더에 있는 error.html을 읽어서 념겨준다
   * 넌적스가 views폴더에 있는 error.html를 넘겨준다고 생각
   */
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "waiting for at listen port");
});

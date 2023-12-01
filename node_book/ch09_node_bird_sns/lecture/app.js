const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const { sequelize } = require("./models");

// 실행순서 중요, dotenv.config()를 해야 .env를 읽어서 process.env에 담긴다
dotenv.config(); // process.env
const pageRouter = require("./routes/page");

const app = express();
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

app.use("/", pageRouter);
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

const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");

// process.env.COOKIE_SECERT없음
dotenv.config(); // process.env
console.log("PORT:", process.env.PORT);
// process.env.COOKIE_SECERT있음
const pageRouter = require("./routes/page");

const app = express();
app.set("port", process.env.PORT || 4242);
// app.set("port", 4242);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  match: true,
});

app.use(morgan("combined")); // 로깅해줌
// 로그 용량을 많이 차자함, 개발할때만 많이 나오게 설정
app.use(express.static(path.join(__dirname, "public")));
// 보안상의 이슈로 public만 접근 가능하게하고 나머지는 접근 못하게 만듦
// public을 static으로 설정

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use("/", pageRouter);
app.use((req, res, next) => {
  // 404 NOT FOUND
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});
/**
 * 404 에러도 아래의 에러처리 미들웨어로 넘어가진다.
 */
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error"); // view/error.html이 전달될 예정, nunjucks.configure("views", {
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

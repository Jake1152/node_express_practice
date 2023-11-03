const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

const { sequelize } = require("./models");
// const indexRouter = require("./routes");
// const usersRouter = require("./routes/users");
// const commentsRouter = require("./models/comments");

const app = express();
app.set("port", process.env.PORT || 3001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

/**
 * sync를 해야 연결이 된다
 * node to mysql
 */
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("## 데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

// sequelize.lo
// sequelize.close(() => {
//   console.log("## 데이터베이스 연결 종료");
// });
/**
 * You can use the .authenticate() function to test if the connection is OK
 * 왜 await가 붙는가?
 */
// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

// async () => {
//   console.log(" ## Connection has been established successfully.");
//   try {
//     await sequelize.authenticate();
//   } catch (error) {
//   }
// };

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: false }));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/comments", commentsRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

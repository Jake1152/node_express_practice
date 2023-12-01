"use strict";

const Sequelize = require("sequelize");
// const User = require("./user");
// const Post = require("./post");
// const Hashtag = require("./hashtag");

const fs = require("fs");
const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

/**
 * 자주 쓰이므르 하나의 객체로 묶어놓음
 * */
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

/**
 * 테이블과 모델의 연결
 */
db.sequelize = sequelize;
// db.User = User;
// db.Post = Post;
// db.Hashtag = Hashtag;

const basename = path.basename(__filename);

// 모델들을 읽는다
fs.readdirSync(__dirname)
  .filter((file) => {
    // .
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    console.log("### ", file, model.name);
    db[model.name] = model;
    model.initiate(sequelize);
  });
// initiate이후에 assoicate가 되어야한다
Object.keys(db).forEach((modelName) => {
  // console.log(db, modelName);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
/**
 * 적어야하는데 까먹을 수 있따
 * 자동화하여 처리할 수 있다
 */
module.exports = db;

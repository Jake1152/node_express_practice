const Sequelize = require("sequelize");
const User = require("./user");
const Comment = require("./comment");

const env = process.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.databse,
  config.username,
  config.password,
  config
);

/**
 * sequelize는 연결객체이다
 */
db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.initiate(sequelize);
Comment.initiate(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;

const Sequelize = require("sequelize");

/**
 * 모델의 기본 구성
 * 1. class 생성 with extends Modal
 * 2. initiate(table 정보), associate(table 관계)
 *
 */
class Hastag extends Sequelize.Modal {
  static initiate(sequelize) {
    Hashtag.init(  {
    title: {
      type: Sequelize.STRING(15),
      allowNull: false,
      unique: true,
    },  {
      sequelize,
      timestamp : true,
      underscored: false,
      paranoid: false,
      modelName: 'Hashtag',
      tableName: 'hashtags',
      charset: 'utf8mb4', // emoji문자가 입력
      collate: 'utf8mb4_general_ci' //  "Hello"와 "hello"를 동일하게 취급하여 비교
    })
  }

  static associate(db) {
    db.Hashtag.belongToMany(db.post, { through: 'PostHashtag'});
  }
}

module.exports = Hastag;

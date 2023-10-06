const Sequelize = require("sequelize");

/**
 * 모델의 기본 구성
 * 1. class 생성 with extends Modal
 * 2. initiate(table 정보), associate(table 관계)
 *
 */
class Post extends Sequelize.Modal {
  static initiate(sequelize) {
    Post.init({
      content: {
        type: Sequelize.STRING(140),
        allowNul: false,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: true,
      }, {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        modelName: 'Post',
        tableName: 'posts',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      })
  }
  static associate(db) {}
}

module.exports = Post;

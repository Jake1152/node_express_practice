const Sequelize = require("sequelize");
class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init(
      {
        content: {
          type: Sequelize.STRING(140), // 140
          allowNull: false,
        },
        /**
         * 현재 구조에서는 이미지를 1개 밖에 못 올리지만
         * 여러개 올리고 싶다면 1:N, N:M의 관계로 만들어서 처리한다.
         */
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        modelName: "Post",
        tableName: "posts",
        charset: "utf8mb4",
        colate: "utf8mb4",
      }
    );
  }

  /**
   * 게시글과 헤시태그의 관계가 필요하다
   * 테이블들간의 관계
   * associate
   * models index
   * 자동생성
   */
  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, {
      through: "PostHashtag",
    });
    // through 바로 접근하는 방법
    // db.sequelize.models.PostHashtag;
  }
}

module.exports = Post;

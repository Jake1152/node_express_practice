const Sequelize = require("sequelize");

/**
 * sequelize model이 DBMS에서는 table이다.
 * sequelize도 자료형 옵션 다 제공한다
 * 다른 점
 * - id: {
 *     type Sequelize.INTEGER,
 *    }
 *   - INTERGER라고 명확하게 적어야한다
 * - sequelize에서는 id를 자동으로 넣으주므로 생략 가능하다
 */
class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        // 컬럼 타입, 이름 설정
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          // type: Sequelize.TINYINT.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN, // true, false
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE, // DATETIME, MYSQL DATE -> seuqelize DateOnly
          allowNull: false,
          defaultValue: Sequelize.NOW, // MYSQL에서는 now()만 섰지만 여러 DBMS를 공통 지원하므로 seuqelize.NOW()같이 변하였다
        },
      },
      // createAt, updatedAt, deletedAt
      /**
       * 회원 정보를 오래 가지고 있어야한다
       * 완전히 삭제는 힘들 수 있다, 몇년이내 복구 요청가능하므로.
       * 그럴때 soft delete로 deletedAt을 쓸 수 있다
       */
      {
        // 두번째 인수는 모델에 대한 설정이다.
        sequelize,
        timestamps: false,
        underscored: false, // sequelize에서 자동 설정해주는 key에 대한 제약조건이다.
        modelName: "User", // Model    Company JS side naming
        tableName: "users", // models  companies DB side naming
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci", // 이모티콘도 사용 가능해짐
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
  }
}

module.exports = User;

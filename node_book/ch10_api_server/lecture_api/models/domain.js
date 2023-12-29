// const { initialize } = require("passport");
const Sequelize = require("sequelize");

class Domain extends Sequelize.Model {
  static initiate(sequelize) {
    /**
     * 이용고객의 도메인을 저장하고
     * 이용고객이 무료이용자인지 유료 이용자인지 구분한다.
     */
    Domain.init(
      {
        host: {
          type: Sequelize.STRING(80),
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM("free", "premium"),
          allowNull: false,
        },
        clientSecret: {
          type: Sequelize.UUID, // 고유한 문자열을 의미한다. 겹칠 확률이 확률상 매우 낮음, 사용자마다 달라야할떄 맏름
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true, // 복구요청일 수 있으니 true처리
        modelName: "Domain",
        tableName: "domains",
      }
    );
  }

  static associate(db) {
    db.Domain.belongsTo(db.User);
  }
}

module.exports = Domain;

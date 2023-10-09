const Sequelize = require("sequelize");

/**
 * 모델의 기본 구성
 * 1. class 생성 with extends Modal
 * 2. initiate(table 정보), associate(table 관계)
 */
/**
 * sequelize에서 없는 table 생성은 가능하지만 이미 있는 table값 변경까지는 힘듦
 * DB에 접근하여 수정해야함
 */
class User extends Sequelize.Modal {
  static initiate(sequelize) {
    User.init({
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: {
        type: Sequelize.ENUM("local", "kakao"),
        allowNull: false,
        defaultValue: "loca",
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      }, {
        sequelize,
        timestamps: true, // createAt, updatedAt
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true, // deleteAt 유저 삭제일, soft delete
        charset: 'uft8',
        collate: 'uft8_general_ci'
    })
  }

  static associate(db) {
    db.User.hasMasy(db.Post);
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow'
    })
    db.User.belongsToMany(db.User, {
      foreignKey: 'followId',
      as: 'Followings',
      through: 'Follow'
    })
  }
}

module.exports = User;

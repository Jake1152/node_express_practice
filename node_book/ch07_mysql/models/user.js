// const express = require("express");
const User = require("../models/user");
// const Comment = require("../models/comment");

// const router = express.Router();

// router
//   .route("/")
//   .get(async (req, res, next) => {
//     try {
//       const users = await User.findAll();
//       res.json(users);
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   })
//   .post(async (req, res, next) => {
//     try {
//       const user = await User.create({
//         name: req.body.name,
//         age: req.body.age,
//         married: req.body.married,
//       });
//       console.log(user);
//       res.status(201).json(user);
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   });

// router.get("/:id/comments", async (req, res, next) => {
//   try {
//     const comments = await Comment.findAll({
//       include: {
//         model: User,
//         where: { id: req.params.id },
//       },
//     });
//     console.log(comments);
//     res.json(comments);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

const Sequelize = require("sequelize");

// class User extends Sequelize.Model {
//   static initiate(sequelize) {
//     User.init(
//       {
//         name: {
//           type: Sequelize.STRING(20),
//           allowNull: false,
//           unique: true,
//         },
//         age: {
//           type: Sequelize.INTEGER.UNSIGNED,
//           allowNull: false,
//         },
//         married: {
//           type: Sequelize.BOOLEAN,
//           allowNull: false,
//         },
//         comment: {
//           type: Sequelize.TEXT,
//           allowNull: true,
//         },
//         created_at: {
//           type: Sequelize.DATE, // DATETIME
//           allowNull: false,
//           defaultValue: Sequelize.NOW, // 제거한 날짜, 데이터를 복구할 수 있으니까 필요
//         },
//       },
//       {
//         sequelize,
//         timestamps: false,
//         underscored: false,
//         modelName: "User",
//         tableName: "users",
//         paranoid: false,
//         charset: "utf8",
//         collate: "utf8_general_ci",
//       }
//     );
//   }

//   static associate(db) {}
// }

// module.exports = User;

// module.exports = router;

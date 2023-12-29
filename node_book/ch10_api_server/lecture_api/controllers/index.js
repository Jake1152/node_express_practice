const { User, Domain } = require("../models");
const { v4: uuidv4 } = require("uuid");

exports.renderLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user?.id || null }, // sequelize where에는 undefined가 들어가면 된다. null은 가능
      include: { model: Domain },
    });
    res.render("login", {
      user,
      domains: user?.Domains,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createDomain = async (req, res, next) => {
  try {
    await Domain.create({
      UserId: req.user.id,
      host: req.body.host,
      type: req.body.type,
      clientSecret: uuidv4(), // 도메인 생성할때 랜덤한 uuid를 client secret으로 넣는다.
    });
    res.redirect("/");
    // const user = await UserActivation.findOne({ where: { id: req.user?.id } });
    // res.render("login", {
    //   user,
    //   domains: user?.Domain,
    // });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

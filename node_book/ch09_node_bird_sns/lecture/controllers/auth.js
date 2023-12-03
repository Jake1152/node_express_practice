const User = require("../models/user");
const bcrypt = require("bcrypt");
/**
 * 회원가입 작성
 */
exports.join = async (req, res, next) => {
  const { nick, email, password } = req.body;
  try {
    // async, await
    const exUser = await User.findOne({ where: { email } });
    console.log(`exUser: ${exUser}`);
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12); // bcrypt 앞에 await 붙는 이유?
    await User.create({ nick, email, password: hash });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.login = () => {};

exports.logout = () => {};

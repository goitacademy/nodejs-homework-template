const User = require("../userRequest");
const { HttpCode } = require("../../helpers/constants");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res, next) => {
  try {
    const user = await User.findByEmail(req.body.email);
    const isValidPassword = await user?.isValidPassword(req.body.password);
    if (!user || !isValidPassword || !user.verify) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Email or password is wrong",
      });
    }
    const { id, email, subscription, avatarURL } = user;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await User.updateToken(id, token);
    return res.json({
      status: "success",
      code: 200,
      token: token,
      user: { email, subscription, avatarURL },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = login;

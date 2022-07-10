const { User } = require("../../models/user");
const getError = require("../../helpers/error");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw getError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const result = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });
    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};
module.exports = register;

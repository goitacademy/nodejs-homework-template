const { User } = require("../../models");
const gravatar = require("gravatar");
const HttpError = require("../../helpers/httpError");
const bcrypt = require("bcrypt");

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw HttpError(409, "Email in use");
    }
    const avatarURL = gravatar.url(email);
    const salt = bcrypt.genSaltSync(10);
    const haschedPassword = bcrypt.hashSync(password, salt);
    const user = await User.create({
      email,
      password: haschedPassword,
      avatarURL,
    });
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { decoratorCtrl } = require("../../helpers");
const { status } = require("../../consts");
const { HttpError } = require("../../helpers");
const { PRIVATE_KEY_TEMP } = require("../../tempConf");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(status.USER_UNAUTHORIZED);
  }

  const isPassCorrect = await bcrypt.compare(password, user.password);

  if (!isPassCorrect) {
    throw HttpError(status.USER_UNAUTHORIZED);
  }

  // const { PRIVATE_KEY } = process.env;
  const { _id } = user;

  const token = jwt.sign({ _id }, PRIVATE_KEY_TEMP, { expiresIn: "12h" });

  await User.updateOne({ _id }, { token });

  res.json({
    ...status.USER_LOGIN,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
    token,
  });
};

module.exports = decoratorCtrl(login);

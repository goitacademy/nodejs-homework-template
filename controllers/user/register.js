const bcrypt = require("bcryptjs");

const { User } = require("../../models");
const { decoratorCtrl } = require("../../helpers");
const { status } = require("../../consts");
const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(status.USER_CONFLICT);
  }

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashPass });

  res.status(status.CREATED.status).json({
    ...status.CREATED,
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = decoratorCtrl(register);

const { User, HttpError } = require("../../models");
const { hashSync, genSaltSync } = require("bcryptjs");

const signup = async (req, res, next) => {
  const { password, email } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    return next(new HttpError(409, "Email in use"));
  }

  const hashPassword = hashSync(password, genSaltSync(10));

  const user = await User.create({ password: hashPassword, email });
  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = signup;

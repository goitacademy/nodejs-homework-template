const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const userSignUp = async (req, res, next) => {
  const { email: emailUser, password, subscription: subscriptionUser } = req.body;
  const user = await User.findOne({ email: emailUser });

  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  try {
    const result = await User.create({
      email: emailUser,
      password: hashPassword,
      subscription: subscriptionUser,
    });
    const { email, subscription } = result;

    res.status(201).json({
      user: { email, subscription },
    });
  } catch (error) {
    if (error._message === "user validation failed") {
      error.status = 400;
    }
    next(error);
  }
};

module.exports = userSignUp;

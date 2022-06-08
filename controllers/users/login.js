const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const userLogin = async (req, res) => {
  const { email: emailUser, password } = req.body;

  const user = await User.findOne({ email: emailUser });

  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }

  const confirmedPassword = bcrypt.compareSync(password, user.password);
  if (!confirmedPassword) {
    throw new Unauthorized("Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 60 * 60 * 24 });
  const updUser = await User.findByIdAndUpdate(user._id, { token }, { new: true });
  res.status(200).json({
    token: token,
    user: {
      email: updUser.email,
      subscription: updUser.subscription,
    },
  });
};

module.exports = userLogin;

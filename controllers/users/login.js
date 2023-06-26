const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const createError = require("http-errors");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // .select('+password');
  if (!user) {
    throw createError(401, { message: "Email or password is wrong" });
  }

  const comparePassword = await bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    throw createError(401, { message: "Email or password is wrong" });
  }
  // console.log('comparePassword', comparePassword);

  const payload = {
    id: user._id,
  };
  //  console.log('payload', user._id)

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  //  console.log('token', token)

  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token: token,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = login;

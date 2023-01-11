const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../db");
const { httpError } = require("../../helpers");

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw httpError(401, "Email or password is wrong");

  if (!(await bcrypt.compare(password, user.password))) {
    throw httpError(401, "Email or password is wrong");
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET
  );
  await User.findByIdAndUpdate(user._id, { $set: { token: token } });
  user.token = token;
  return user;
};

module.exports = { login };

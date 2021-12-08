const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { HTTP401Error, HTTP400Error } = require("../../helpers/errorHandlers");
const User = require("../../models/users");

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new HTTP401Error("You are not authorized yet, please signup");
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    throw new HTTP400Error("Invalid password");
  }
  const { SECRET_KEY } = process.env;

  const token = jwt.sign({ id: user._id }, SECRET_KEY);

  const loginedUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  return loginedUser;
};

module.exports = login;

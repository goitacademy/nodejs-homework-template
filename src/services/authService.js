const User = require("../models/userModel");
const { NotAuthorizedError } = require("../utils/error");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registration = async (email, password) => {
  const user = new User({ email, password });
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError("Is not valid email");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Password is incorrect");
  }
  const token = jsonwebtoken.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
  return token;
};

const logout = async (id) => {
  const user = await User.findByIdAndUpdate(id, { token: null });

  if (!user) throw new NotAuthorizedError("Not authorized");
};
const getCurrentUser = async (id) => {
  const user = await User.findById(id);
  if (!user || !user.token) {
    throw new NotAuthorizedError("Not authorized");
  }
  return user;
};

module.exports = {
  registration,
  login,
  logout,
  getCurrentUser,
};

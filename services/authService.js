const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");
const { NotAuthorizedError } = require("../Helpers/errors");
const { updateToken } = require("./userService");

const signup = async (email, password) => {
  const user = new User({ email, password });
  if (user) await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw NotAuthorizedError(`No user with email: '${email}' found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`Wrong password`);
  }

  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );
  return token;
};

const logout = async (userId) => {
  if (!userId) {
    throw new NotAuthorizedError("Not authorized. You need to be logged in!");
  }

  const user = await User.findOne({ _id: userId });
  console.log(user);
  const data = await updateToken(userId, null);
  console.log(user);
  return user;
};
module.exports = {
  signup,
  login,
  logout,
};

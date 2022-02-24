const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../db/userModel");
const {
  DuplicationEmailError,
  UnauthorizedError,
} = require("../helpers/errors");

const registrationUser = async (body) => {
  const { email, password } = body;

  const findUserByEmail = await User.findOne({ email });
  if (findUserByEmail) {
    throw new DuplicationEmailError("Email in use");
  }

  const user = new User({ email, password });
  await user.save();

  return user;
};

const loginUser = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthorizedError("Email or password is wrong");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedError("Email or password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  user.token = token;
  await user.save();

  return { token, user };
};

const logoutUser = async (user) => {
  user.token = null;
  await user.save();
};

const patchUser = async (userId, body) => {
  await User.findOneAndUpdate(userId, {
    $set: { subscription: body.subscription },
  });

  const updatedUser = await User.findOne({ userId });

  return updatedUser;
};

module.exports = { registrationUser, loginUser, logoutUser, patchUser };

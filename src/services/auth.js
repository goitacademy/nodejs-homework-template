const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const gravatar = require("gravatar");
const {
  NotAuthorizedError,
  WrongParametersError,
} = require("../helpers/errors");

const registration = async (email, password, data) => {
  const avatarURL = gravatar.url(email, { s: "200" });
  try {
    const user = new User({
      email,
      password,
      avatarURL,
      ...data,
    });
    await user.save();
  } catch (err) {
    console.error(err);
  }
};
const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotAuthorizedError(`No user with email ${email}=()`);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new WrongParametersError(`Wrong password=()`);
    }
    const token = jwt.sign(
      {
        _id: user._id,
        createdAt: user.createdAt,
      },
      process.env.JWT_SECRET
    );
    console.log("user._id", user._id);
    await User.findByIdAndUpdate(user._id, { token });
    user.token = token;
    return token;
  } catch (err) {
    console.error(err);
  }
};
const logout = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotAuthorizedError(`No user with email ${email}=()`);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new WrongParametersError(`Wrong password=()`);
    }
    const token = null;
    await User.findByIdAndUpdate(user._id, { token });
    user.token = null;
    return user;
  } catch (err) {
    console.error(err);
  }
};
const current = async (userId) => {
  try {
    console.log(userId);
    const user = await User.findById(userId);

    if (!user) {
      throw new NotAuthorizedError(`No user with id ${userId}=()`);
    }
    return user;
  } catch (err) {
    console.error(err);
  }
};
module.exports = {
  registration,
  login,
  logout,
  current,
};

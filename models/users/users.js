const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./model");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const getUserByEmail = async email => {
  return User.findOne({ email });
};

function hashPassword(plaintextPassword) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(plaintextPassword, salt);
  return hash;
}

function comparePassword(plaintextPassword, hash) {
  const result = bcrypt.compareSync(plaintextPassword, hash);
  return result;
}

const register = async ({ email, password }) => {
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, password: hashedPassword });
    const url = gravatar.url(email);
    newUser.avatarURL = url;
    await newUser.save();
    return User.findOne({ email });
  } catch (e) {
    console.error(e);
  }
};

const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !comparePassword(password, user.password)) {
      return null;
    } else {
      const token = jwt.sign({ ...user }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      await User.findOneAndUpdate({ _id: user.id }, { $set: { token: token } });
      return await User.findOne({ email });
    }
  } catch (e) {
    console.error(e);
  }
};

const logout = async id => {
  try {
    return await User.findOneAndUpdate({ _id: id }, { $set: { token: null } });
  } catch (e) {
    console.error(e);
  }
};

const uploadAvatar = async () => {};

module.exports = {
  register,
  getUserByEmail,
  login,
  logout,
};

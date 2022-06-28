const { User } = require("../models");
const { genSaltSync } = require("bcrypt");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const signinUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });
  if (user) {
    throw createError(409, `User  alredy exist`);
  }
  const password = userData.password;
  const avatarURL = gravatar.url(userData.email);
  const hashPassword = await bcrypt.hashSync(password, genSaltSync(10));
  return User.create({ ...userData, password: hashPassword, avatarURL });
};
module.exports = signinUser;

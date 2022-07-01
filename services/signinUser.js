const { User } = require("../models");
const { genSaltSync } = require("bcrypt");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const signinUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });
  if (user) {
    throw createError(409, `User  already exist`);
  }
  const verificationToken = v4();
  const password = userData.password;
  const avatarURL = gravatar.url(userData.email);
  const hashPassword = bcrypt.hashSync(password, genSaltSync(10));

  return await User.create({
    ...userData,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  
  
};
module.exports = signinUser;

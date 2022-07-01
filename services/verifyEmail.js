const { User } = require("../models");
const createError = require("http-errors");

const verifyEmail = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw createError("404", "Not found");
  }
  return await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
};

module.exports = verifyEmail;

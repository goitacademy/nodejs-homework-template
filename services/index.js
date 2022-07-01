const signinUser = require("./signinUser");
const loginUser = require("./loginUser");
const verifyEmail = require("./verifyEmail");
const services = {
  signinUser,
  loginUser,
  verifyEmail,
};
module.exports = services;

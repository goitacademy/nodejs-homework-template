const { ctrlWrapper } = require("../../Helpers");

const { register } = require("./register");
const { login } = require("./login");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};

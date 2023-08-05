const { ctrlWrapper } = require("../../middlewares");
const register = require("./register");

module.exports = {
  register: ctrlWrapper(register),
};

const { ctrlWrapper } = require("../../helpers");

const signup = require("./signup");
const login = require("./login");

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
};

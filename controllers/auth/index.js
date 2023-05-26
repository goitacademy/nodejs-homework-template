const { ctrlWrapper } = require("../../helpers");

const signup = require("./signup");
const signin = require("./signin");

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
};

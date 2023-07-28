const User = require("../../models/user");
const { HttpError } = require("../../helpers");
const ctrlWrapper = require("../../decorators");

const signup = async (req, res) => {};


module.exports = {
  signup: ctrlWrapper(signup),
};

const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const logout = (req, res) => {};

module.exports = ctrlWrapper(logout);

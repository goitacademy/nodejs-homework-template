const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  throw HttpError(204, "No Content");
};

module.exports = {
  logout: ctrlWrapper(logout),
};

const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById({ _id });
  if (!user) {
    throw HttpError(401);
  }
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "Logout success" });
};

module.exports = logoutUser;

const { User } = require("../../models");

const { HttpError } = require("../../helpers");

const logout = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "No Content" });
};

module.exports = logout;

const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOne({ _id });
  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  await User.findByIdAndUpdate(_id, { token: null });

  res.json({
    status: "Success",
    code: "204",
    message: "No Content",
  });
};

module.exports = logout;

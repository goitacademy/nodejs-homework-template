const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, { token: "" });

  if (!user) {
    throw HttpError(401, "Not authorized");
  }
  res.status(204);
  res.end();
};

module.exports = logout;

const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { _id, token } = req.user;
  await User.findOneAndUpdate(_id, { token: "" });

  if (!token) {
    throw HttpError(401, "Not authorized");
  }

  res.json({
    Authorization: token,
  });
};

module.exports = logout;

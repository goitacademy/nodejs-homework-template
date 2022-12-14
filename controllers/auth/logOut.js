const { User } = require("../../models/user");

async function logOut(req, res) {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
}

module.exports = logOut;

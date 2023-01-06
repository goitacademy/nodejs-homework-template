const { User } = require("../../models/");

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  await User.findOneAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = logout;

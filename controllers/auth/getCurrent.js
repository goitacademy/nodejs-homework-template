const { User } = require("../../models/user");
const getCurrent = async (req, res) => {
  const { _id } = req.user;
  const { email, subscription } = await User.findById(_id);
  res.status(200).json({ email, subscription });
};

module.exports = getCurrent;

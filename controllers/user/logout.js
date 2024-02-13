const User = require("../../models/users");

const logout = async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  user.token = null;
  await user.save();

  res.status(204).send();
};

module.exports = logout;

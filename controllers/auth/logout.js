const User = require("../../models/users");

const logout = async (req, res) => {
  const user = req.user;

  const result = await User.findByIdAndUpdate(
    user.userId,
    { tokin: "" },
    { new: true }
  );

  res.status(204).json(result);
};

module.exports = logout;

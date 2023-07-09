const User = require("../models/user");
const { ctrlWrapper } = require("../helpers");

const logout = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate({ token: "" });

  res.json({ message: "Logout success" });
});

module.exports = logout;

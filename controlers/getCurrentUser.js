const { ctrlWrapper } = require("../helpers");

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

module.exports = ctrlWrapper(getCurrentUser);

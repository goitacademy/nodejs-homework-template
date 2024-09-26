const { ctrlWrapper } = require("../helpers");

const getCurrentUser = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.json({ email, subscription, avatarURL });
};

module.exports = ctrlWrapper(getCurrentUser);

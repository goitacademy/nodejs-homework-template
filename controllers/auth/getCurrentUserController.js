const { Unauthorized } = require("http-errors");

const getCurrentUserController = async (req, res) => {
  const { email, subscription } = req.user;

  if (!email) throw new Unauthorized("Not authorized");

  res.status(200).json({ email, subscription });
};

module.exports = getCurrentUserController;

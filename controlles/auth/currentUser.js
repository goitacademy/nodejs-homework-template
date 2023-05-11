const { ctrlWrapper } = require("../../helpers");

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

module.exports = ctrlWrapper(currentUser);

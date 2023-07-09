const { ctrlWrapper } = require("../helpers");

const getCurrent = ctrlWrapper(async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
});

module.exports = getCurrent;

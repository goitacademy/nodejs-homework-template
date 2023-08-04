const { ctrlWrapper } = require("../../helpers");

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  console.log("🚀 ~ req.user:", req.user);

  res.json({ email, subscription });
};

module.exports = { getCurrent: ctrlWrapper(getCurrent) };
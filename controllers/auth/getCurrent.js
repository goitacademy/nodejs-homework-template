const { ctrlWrapper } = require("../../utils");

const getCurrent = async (req, res, next) => {
  const { name, email, subscription } = req.user;
  res.json({
    name,
    email,
    subscription,
  });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};

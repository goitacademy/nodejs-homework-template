const { ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.json({
    email,
  });
};
module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};

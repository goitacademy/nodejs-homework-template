const { ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { email, name } = req.user;

  res.json({
    email,
    name,
  });
};

module.exports = ctrlWrapper(getCurrent);

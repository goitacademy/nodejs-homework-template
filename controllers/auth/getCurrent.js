const { ctrlWrapper } = require('../../helpers');

const getCurrent = async (req, res, next) => {
  const { email } = req.user;

  res.json({
    email,
  });
};

module.exports = ctrlWrapper(getCurrent);
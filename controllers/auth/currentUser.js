const { ctrlWrapper } = require('../../helpers');

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    user: {
      email: email,
      subscription: subscription,
    },
  });
};

module.exports = { getCurrent: ctrlWrapper(getCurrent) };

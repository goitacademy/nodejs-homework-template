const { User } = require('../../models');

const getCurrent = async (req, res) => {
  const { name, email, subscription } = req.user;
  res.status(200).json({
    data: {
      user: {
        name,
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrent;

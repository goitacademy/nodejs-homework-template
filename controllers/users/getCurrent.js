const { User } = require('../../models');

const getCurrent = async (req, res) => {
  const { subscription, email } = req.user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        subscription,
        email,
      },
    },
  });
};

module.exports = getCurrent;

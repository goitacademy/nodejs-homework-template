const { User } = require('../../models');

const getCurrent = async (req, res) => {
  const { subscription, email } = req.user;
  console.log('req.user-getCurrent:', req.user);

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

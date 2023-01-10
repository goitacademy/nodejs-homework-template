const { User } = require('../../models');

const getCurrent = async (req, res) => {
  console.log(req.user);
  const { name, email } = req.user;
  res.status(200).json({
    status: 'success',
    code: 200,
    date: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = getCurrent;

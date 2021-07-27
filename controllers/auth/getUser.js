require('dotenv').config();

const getUser = (req, res, next) => {
  const userProfile = {
    email: req.user.email,
    subscription: req.user.subscription,
  };
  res.json({
    status: 'success',
    code: 200,
    data: { result: userProfile },
  });
};

module.exports = getUser;

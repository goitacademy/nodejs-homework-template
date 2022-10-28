const { loginUser } = require('../../services/authServices');

const login = async (req, res, next) => {
  try {
    const { token, user } = await loginUser(req.body);
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    next();
  }
};

module.exports = login;

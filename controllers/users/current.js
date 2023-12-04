const { Unauthorized } = require('http-errors');
const current = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user || !user.token) {
      throw new Unauthorized('Not authorized');
    }
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = current;

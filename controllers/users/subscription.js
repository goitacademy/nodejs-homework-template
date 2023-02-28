const { User } = require('../../models/users');

const subscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  try {
    const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true });
    const { email, subscription: subscr } = result;
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        user: {
          email,
          subscription: subscr,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = subscription;

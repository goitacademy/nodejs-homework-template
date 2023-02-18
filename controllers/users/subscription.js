const { User } = require('../../models/users');

const subscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subsc } = req.body;
  try {
    const result = await User.findByIdAndUpdate(_id, { subsc }, { new: true });
    const { email, subscription } = result;
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = subscription;

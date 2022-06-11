const { User } = require('../../models');

const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const { _id } = req.user;

    const result = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );
    const { email } = result;

    res.json({
      user: {
        _id,
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;

const { User } = require('../../models/usersModel');

const updateSubscription = async (req, res, next) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;
  try {
    await User.findByIdAndUpdate(_id, { subscription });
    res.json({
      status: "success",
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

module.exports = updateSubscription;

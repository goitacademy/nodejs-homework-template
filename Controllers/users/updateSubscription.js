const { User } = require('../../models');

const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;
  const data = await User.findOneAndUpdate(
    { _id: id },
    { subscription },
    { new: true },
  );

  res.status(200).json({
    data: {
      user: {
        subscription,
      },
    },
  });
};

module.exports = updateSubscription;

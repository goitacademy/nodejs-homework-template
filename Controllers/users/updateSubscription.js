const { User } = require('../../models');

const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const { name, email, subscription } = req.body;
  const data = await User.findOneAndUpdate(
    { _id: id },
    { name, email, subscription },
    { new: true },
  );

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      user: {
        name,
        email,
        subscription,
      },
    },
  });
};

module.exports = updateSubscription;

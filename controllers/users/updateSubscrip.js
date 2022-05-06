const { User } = require('../../models/user');
const { validationById } = require('../../middlewares');

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { userId } = req.params;
  validationById(userId);

  const result = await User.findByIdAndUpdate(
    userId,
    { subscription },
    { new: true }
  );
  res.json(result);
};

module.exports = updateSubscription;

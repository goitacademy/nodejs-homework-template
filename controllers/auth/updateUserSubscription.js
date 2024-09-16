const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const updateUserSubscription = async (req, res) => {
    const { subscription } = req.body;
  
    const validSubscriptions = ['starter', 'pro', 'business'];
    if (!validSubscriptions.includes(subscription)) {
      return res.status(400).json({ message: 'Invalid subscription value' });
    };

      const userId = req.user._id;
      const result = await User.findByIdAndUpdate(userId, { subscription }, { new: true, select: 'email subscription' });
      if (!result) {
        throw new HttpError(404);
    };

      res.json(result);
  };

  module.exports = updateUserSubscription;
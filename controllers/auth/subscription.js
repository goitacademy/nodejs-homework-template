const { User } = require('../../models/user');
const getCurrent = require('./getCurrent');

const subscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  console.log(req.body);

  const result = await User.findByIdAndUpdate(_id, {
    subscription: subscription,
  });
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = subscription;

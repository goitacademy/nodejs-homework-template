const { User } = require('../../models/user');

const subscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true });
  res.status(200).json({ result });
};

module.exports = subscription;

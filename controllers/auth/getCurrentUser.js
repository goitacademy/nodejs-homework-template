const { User } = require('../../models');

const getCurrentUser = async (req, res, _) => {
  const id = req.user.id;
  const user = await User.findById(id);
  const { email, subscription, avatarURL } = user;
  return res.status(200).json({
    id: id,
    email: email,
    subscription: subscription,
    avatarURL: avatarURL,
  });
};

module.exports = getCurrentUser;

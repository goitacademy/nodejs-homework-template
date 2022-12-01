const { User } = require('../../models/user');
const { HTTPError } = require('../../helpers');

const updateUser = async (req, res, next) => {
  const { _id, email, token } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate({ _id }, { subscription }, { new: true });
  if (!result) {
    throw HTTPError(404);
  }

  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = updateUser;

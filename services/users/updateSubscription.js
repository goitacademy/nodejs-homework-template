const { User } = require('../../models/user');

module.exports = async (req) => {
  const { id } = req.user;

  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return user;
};

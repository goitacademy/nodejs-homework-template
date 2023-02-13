const { User } = require('../../models/user');

module.exports = async (req) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  return user;
};

const { User } = require('../../models/user');

module.exports = async (_id) => {
  return User.findByIdAndUpdate(
    _id,
    { token: null },
    { new: true }
  );
};

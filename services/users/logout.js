const { User } = require('../../models/user');

module.exports = async (id) => {
  return User.findByIdAndUpdate(
    id,
    { token: null },
    { new: true }
  );
};

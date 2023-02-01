const { User } = require('../../models/user');

module.exports = async (id, token) => {
  return User.findByIdAndUpdate(id, { token });
};

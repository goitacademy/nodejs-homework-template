const { User } = require('../../models/user');

module.exports = async (_id, token) => {
  return User.findByIdAndUpdate(_id, { token });
};

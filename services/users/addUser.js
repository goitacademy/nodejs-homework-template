const { User } = require('../../schemas/modelUser');
const bcrypt = require('bcrypt');

const addUser = async ({ email, password }) => {
  return await User.create({ email, password: bcrypt.hash(password, 10) });
};

module.exports = { addUser };

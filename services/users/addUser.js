const { User } = require('../../schemas/modelUser');

const addUser = async (email, password) => {
  return await User.create({
    email,
    password,
  });
};

module.exports = { addUser };

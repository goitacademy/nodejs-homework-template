const { User } = require('../../schemas/modelUser');

const addUser = async (email, password, avatarURL) => {
  return await User.create({
    email,
    password,
    avatarURL,
  });
};

module.exports = { addUser };

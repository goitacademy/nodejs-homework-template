const { User } = require('../../schemas/modelUser');

const addUser = async (email, password, avatarURL, verificationToken) => {
  return await User.create({
    email,
    password,
    avatarURL,
    verificationToken,
  });
};

module.exports = { addUser };

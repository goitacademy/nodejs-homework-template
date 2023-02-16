const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');

const findUser = async (email) => {
  return await User.findOne({ email });
};

const hashPass = (password) => {
  return bcrypt.hashSync(password, 10);
};

const createNewUser = async (
  user,
  avatarURL,
  verificationCode
) => {
  const hashedPassword = await hashPass(user.password);

  const newUser = await User.create({
    email: user.email,
    password: hashedPassword,
    verificationCode,
    avatarURL,
  });

  return newUser;
};

module.exports = {
  findUser,
  createNewUser,
};

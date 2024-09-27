const { User } = require('../sсhemas/user');

const signup = async (email, password) => {
  const founderUser = await User.findOne({ email });
  if (founderUser) {
    return false;
  }

  const user = await new User({
    email,
    password: undefined,
  });
  await user.setPassword(password);

  const newUser = await User.create(user);
  return newUser;
};

const login = async (email) => {
  const user = await User.findOne({ email }, 'password');
  return user;
};

const logout = async (id) => {
  const user = await User.findOneAndUpdate(id, { token: null }, { new: true });
  return user;
};

const updateLogin = async (email, token) => {
  const user = await User.findOneAndUpdate({ email }, { token }, { new: true });
  return user;
};

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

module.exports = {
  signup,
  login,
  logout,
  updateLogin,
  findUserById,
};

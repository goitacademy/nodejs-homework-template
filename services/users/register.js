const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");

const hashPass = async (password) => {
  const res = await bcrypt.hash(password, 10);
  return res;
};

const findUser = async (email) => await User.findOne({ email });

const createNewUser = async (user) => {
  const hashedPassword = await hashPass(user.password);

  const newUser = await User.create({ ...user, password: hashedPassword });
  return newUser;
};

module.exports = {
  findUser,
  createNewUser,
};

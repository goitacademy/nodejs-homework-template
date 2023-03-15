const { User } = require("../schemas");

const findUserInDb = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const addNewUser = async (body) => {
  const { email, password } = body;
  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();
};

const updateUser = async (userId, data) => {
  return await User.findByIdAndUpdate({ _id: userId }, data, {
    new: true,
  });
};

const removeToken = async (id) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { token: null },
    {
      new: true,
    }
  );
};

module.exports = {
  findUserInDb,
  findUserById,
  addNewUser,
  updateUser,
  removeToken,
};

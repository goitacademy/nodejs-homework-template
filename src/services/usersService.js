const { User } = require("../schemas");

const findUserInDb = async (email) => {
  return await User.findOne({ email });
};

const findUserToVerify = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const addNewUser = async (body) => {
  const { email, password, verificationToken } = body;
  const newUser = new User({ email, verificationToken });
  newUser.setPassword(password);
  newUser.generateAvatar(email);
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
  findUserToVerify,
};

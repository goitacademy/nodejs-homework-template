const { User } = require("./user.model");

const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (e) {
    // Przykładowa obsługa błędu
    console.error(e);
    return [];
  }
};

const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (e) {
    // Przykładowa obsługa błędu
    return null;
  }
};

const saveUser = async (user) => {
  try {
    const newUser = new User(user);
    const saveResult = await newUser.save();

    return saveResult;
  } catch (e) {
    // Przykładowa obsługa błędu
    console.error(e.message);
    return null;
  }
};

const replaceUser = async (id, modifiedUser) => {
  try {
    return await User.findByIdAndUpdate(id, modifiedUser, { new: true });
  } catch (e) {
    // Przykładowa obsługa błędu
    console.error(e.message);
    return null;
  }
};

const removeUser = async (id) => {
  try {
    await User.findByIdAndDelete(id);
  } catch (e) {
    // Przykładowa obsługa błędu
    console.error(e);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  saveUser,
  replaceUser,
  removeUser,
};

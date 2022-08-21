const Users = require('../authSchema');
const bcrypt = require('bcrypt');

const getUserById = async userId => {
  try {
    return Users.findOne({ _id: userId });
  } catch (err) {
    throw new Error(err.message);
  }
};

const registerUser = async ({ email, password, subscription = 'starter' }) => {
  // в mongoose встроенная валидация, так что про уникальность можно не беспокоиться, а обработка ошибки происходит в models/db-service/auth - signupController
  try {
    // 10 - salt - количество рангов хеширования, не забыть await перед bcrypt.hash
    return Users.create({ email, password: await bcrypt.hash(password, 10), subscription });
  } catch (err) {
    throw new Error(err.message);
  }
};
// в начале поиск потом апдейт
// findoneAndUpdate
const getUserIdByEmail = async ({ email }) => {
  try {
    const { _id } = await Users.findOne({ email });

    return _id;
  } catch (err) {
    throw new Error(err.message);
  }
};

const loginUser = async (userId, token) => {
  try {
    await Users.findOneAndUpdate({ _id: userId }, { token });
    return Users.findOne({ _id: userId });
  } catch (err) {
    throw new Error(err.message);
  }
};

const logoutUser = async userId => {
  try {
    await Users.findOneAndUpdate({ _id: userId }, { token: null });
    return Users.findOne({ _id: userId });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getUserById,
  registerUser,
  loginUser,
  getUserIdByEmail,
  logoutUser,
};

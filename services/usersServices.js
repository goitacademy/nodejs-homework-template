const jwt = require('jsonwebtoken');
const { HttpCode } = require('../helpers/constants');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const {
  findUserByEmail,
  updateToken,
  createUser,
  updateUserById
} = require('../model/users')

const signup = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (user) {
    throw new CustomError(HttpCode.CONFLICT, 'This email is already use');
  }
  const newUser = await createUser(email, password);
  return newUser;
};

const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  const isValidPassword = await user?.validPassword(password);
  if (!user || !isValidPassword) {
    throw new CustomError(
      HttpCode.UNAUTHORIZED,
      'Email or password is wrong'
    );
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '3h' });
  const result = await updateToken(user._id, token);
  return result;
}

const logout = async (id) => await updateToken(userId, null);

const getCurrent = async userId => await getUserById(userId);

const updateUser = async (userId, body) => await updateUserById(userId, body);

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  updateUser
}
// ./contrllers/auth/authController.js

const { catchAsync } = require('../../utils');
const userService = require('../../services/auth/userService');

const signup = catchAsync(async (req, res) => {
  const { user, token } = await userService.signupUser(req.body);

  res.status(201).json({
    user,
    token,
  });
});

const login = catchAsync(async (req, res) => {
  const { user, token } = await userService.loginUser(req.body);

  res.status(200).json({
    user,
    token,
  });
});

const logout = catchAsync(async (req, res, next) => {
  // Отримуємо токен з заголовка Authorization (Bearer токен)
  const token = req.headers.authorization?.split(' ')[1];

  await userService.getCurrentUser(token);

  // Повертаємо успішну відповідь
  res.sendStatus(204);
});

const getCurrentUser = catchAsync(async (req, res, next) => {
  // Отримуємо токен з заголовка Authorization (Bearer токен)
  const token = req.headers.authorization?.split(' ')[1];

  const { user } = await userService.getCurrentUser(token);

  // Повертаємо успішну відповідь і дані користувача
  res.status(200).json({
    msg: 'Sucess',
    user,
  });
});

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
};

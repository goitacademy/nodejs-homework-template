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

module.exports = {
  signup,
  login,
};

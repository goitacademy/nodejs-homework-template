const express = require('express');
const { tryCatchWrapper } = require('../../helpers');
const { validateBody } = require('../../middlewares/validation');
const {
  register,
  login,
  logout,
} = require('../../controllers/auth.controller');
const {
  userCreateValidationSchema,
} = require('../../schemas/userValidationSchema');

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(userCreateValidationSchema),
  tryCatchWrapper(register)
);
authRouter.post('/login', tryCatchWrapper(login));
authRouter.post('/logout', tryCatchWrapper(logout));

module.exports = {
  authRouter,
};

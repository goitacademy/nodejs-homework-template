const express = require('express');
const authController = require('../../controllers/auth-controller');

const authRouter = express.Router();

const { validateBody } = require('../../decoraters/validateBody');
const { authenticate, upload } = require('../../middlewares');

const userSchemas = require('../../schemas/user-schemes');
module.exports = authRouter;

authRouter.post(
  '/register',
  validateBody(userSchemas.userRegisterSchema),
  authController.signup
);

authRouter.post(
  '/login',
  validateBody(userSchemas.userLogInSchema),
  authController.signIn
);

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.post('/logout', authenticate, authController.logout);

authRouter.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  authController.updateAvatar
);

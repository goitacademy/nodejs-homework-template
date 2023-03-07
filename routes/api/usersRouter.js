const express = require('express');
const router = express.Router();

const {
  schemaAddUser,
  schemaMailUser,
} = require('../../schemas/validateshemasUser.js');
const {
  validateUser,
  validateMailUser,
} = require('../../middlewares/validateUser');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { uploadMiddleware } = require('../../middlewares/uploadMiddleware');
const {
  controllerSingUpUser,
  controllerLoginUser,
  controllerLogoutUser,
  controllerGetUser,
  controllerUpdateAvatarUser,
  controllerVerifyUser,
  controllerVerifyTwoSendMailUser,
} = require('../../controllers/users');

router.post('/users/signup', validateUser(schemaAddUser), controllerSingUpUser);
router.post('/users/login', validateUser(schemaAddUser), controllerLoginUser);
router.get('/users/logout', authMiddleware, controllerLogoutUser);
router.get('/users/current', authMiddleware, controllerGetUser);
router.patch(
  '/users/avatars',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  controllerUpdateAvatarUser
);
router.get('/users/verify/:verificationToken', controllerVerifyUser);
router.post(
  '/users/verify',
  validateMailUser(schemaMailUser),
  controllerVerifyTwoSendMailUser
);

module.exports = router;

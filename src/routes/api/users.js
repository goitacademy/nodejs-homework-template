const express = require('express');
const router = express.Router();
const { upload } = require('../../helpers/uploadTemp')

const { asyncWrapper } = require('../../helpers/apiHelpers');
const { authMiddleware } = require('../../middlewares/authMiddleware');

const {
  userDataValidation,
} = require('../../middlewares/userValidationMiddleware');

const AuthController = require('../../controllers/authController');
const FilesController = require('../../controllers/filesController');

router.post(
  '/signup',
  userDataValidation,
  asyncWrapper(AuthController.registration)
);
router.post('/login', userDataValidation, asyncWrapper(AuthController.login));
router.post('/logout', authMiddleware, asyncWrapper(AuthController.logout));
router.post(
  '/current',
  userDataValidation,
  authMiddleware,
  asyncWrapper(AuthController.receiveCurrentUser)
);

router.patch(
  '/avatars',
  upload.single('avatar'),
  FilesController.avatarUpdater
);

module.exports = router;

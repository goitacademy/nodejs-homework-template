const express = require('express');
const router = express.Router();
const userController = require('../controllers').users;
const { authorizeUser } = require('../midlewares/authorization');
const { uploadMiddleware } = require("../midlewares/upload");

router.post('/signup', userController.register.register);
router.post('/login', userController.login.login);
router.get('/logout', authorizeUser, userController.logout.logout);
router.get('/current', authorizeUser, userController.current.current);
router.get('/verify/:verificationToken', userController.verifyUserByToken.verifyUserByToken);
router.patch('/:userId/subscription', authorizeUser, userController.updateSubscription.updateSubscription);
router.delete("/", userController.deleteUserByMail.deleteUserByMail);
router.patch(
  "/avatars",
  authorizeUser,
  uploadMiddleware.single("avatar"),
  userController.updateAvatar.updateAvatar
);


module.exports = router;

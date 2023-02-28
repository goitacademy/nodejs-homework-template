const express = require('express');
const router = new express.Router();
const {
    userPostValidation,
    userVerifyValidation,
    userPatchValidation,
    authMiddleware,
    avatarMiddleware } = require('../../middlewares');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const {
    ctrlSignup,
    ctrlVerification,
    ctrlReVerification,
    ctrlLogin,
    ctrlLogout,
    ctrlCurrent,
    ctrlChangeSubscription,
    ctrlChangeAvatar } = require('../../controllers/authController');

router.post('/users/signup', userPostValidation, asyncWrapper(ctrlSignup));
router.get('/users/verify/:verificationToken', asyncWrapper(ctrlVerification));
router.post('/users/verify', userVerifyValidation, asyncWrapper(ctrlReVerification));
router.post('/users/login', userPostValidation, asyncWrapper(ctrlLogin));
router.get('/users/logout', authMiddleware, asyncWrapper(ctrlLogout));
router.get('/users/current', authMiddleware, asyncWrapper(ctrlCurrent));
router.patch('/users', userPatchValidation, authMiddleware, asyncWrapper(ctrlChangeSubscription));
router.patch('/users/avatars',
    authMiddleware,
    avatarMiddleware.single('avatar'),
    asyncWrapper(ctrlChangeAvatar)
);

module.exports = router;
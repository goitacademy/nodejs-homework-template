const express = require('express');

const router = express.Router();
const { 
    register, 
    login, 
    getCurrent, 
    logout, 
    updateAvatar,
    verify,
    resendVerificationLink
} = require('../../controllers/auth-controller');
const { validateBody } = require('../../utils');
const { userRegisterSchema, resendVerificationLinkSchema } = require('../../schemas');
const { authenticate, upload } = require('../../middlewares');

router.post('/register', validateBody(userRegisterSchema), register);

router.get('/verify/:verificationToken', verify);

router.post('/verify', validateBody(resendVerificationLinkSchema) , resendVerificationLink)

router.post('/login', validateBody(userRegisterSchema), login);

router.get('/current', authenticate, getCurrent);

router.post('/logout', authenticate, logout);

router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar)

module.exports = router;
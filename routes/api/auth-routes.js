const express = require('express');

const authControllers = require('../../controllers/auth-controllers');

const { schemas } = require('../../models/user');

const { validateBody, authenticate, upload } = require('../../middlewares');


const router = express.Router();


// signup
router.post('/register', validateBody(schemas.userRegisterSchema), authControllers.register);

// verify
router.get('/verify/:verificationCode', authControllers.verify);

router.post('/verify', validateBody(schemas.userEmailSchema), authControllers.resendVerifyEmail)

// signin
router.post('/login', validateBody(schemas.userLoginSchema), authControllers.login);

// current
router.get('/current', authenticate, authControllers.getCurrent);

// signout
router.post('/logout', authenticate, authControllers.logout);

// patch subscription
router.patch("/subscription", authenticate, validateBody(schemas.userUpdateSchema), authControllers.updateSubscription)

// patch avatars
router.patch("/avatars", authenticate, upload.single('avatar'), authControllers.updateAvatar)



module.exports = router;

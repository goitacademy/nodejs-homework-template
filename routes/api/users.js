const express = require('express');
const {usersApi}  = require('../../controllers');
const {joiRegisterSchema, joiLoginSchema, joiSubscriptionSchema} = require('../../models')
const { ctrlWrapper, validation, auth, upload } = require('../../middlewares') 
const router = express.Router();

router.post('/signup', validation(joiRegisterSchema), ctrlWrapper(usersApi.register));
router.post('/login', validation(joiLoginSchema), ctrlWrapper(usersApi.login));
router.post("/verify", ctrlWrapper(usersApi.resendEmail));
router.get('/current', auth, ctrlWrapper(usersApi.getCurrent));
router.get('/logout', auth, ctrlWrapper(usersApi.logout));
router.get('/verify/:verificationToken', ctrlWrapper(usersApi.verifyEmail));
router.patch('/', auth, validation(joiSubscriptionSchema), ctrlWrapper(usersApi.putchSubscription));
router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(usersApi.updateAvatar));



module.exports = router;
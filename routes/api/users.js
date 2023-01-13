const express = require('express');

const {users: ctrl} = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const {validateBody, auth, upLoad} = require("../../middlewares");

const { joiRegisterSchema, joiLoginSchema, verifyEmailSchema } = require("../../schemas");

const router = express.Router();


router.post('/signup', validateBody(joiRegisterSchema), ctrlWrapper(ctrl.register));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

router.post('/verify', validateBody(verifyEmailSchema), ctrlWrapper(ctrl.resendEmail));
// router.post('/verify', ctrlWrapper(ctrl.resendEmail))


router.post('/login', validateBody(joiLoginSchema), ctrlWrapper(ctrl.login));

router.patch('/avatars', auth, upLoad.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));


module.exports = router;
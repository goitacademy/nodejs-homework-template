const express = require('express');

const { auth, validation, ctrlWrapper } = require('../../middlewares/');
const {auth: ctrl} = require('../../controllers');
const {joiRegisterSchema, joiLoginSchema, verifyEmailSchema } = require('../../models/user')

const router = express.Router();

router.post('/register', validation(joiRegisterSchema), ctrlWrapper(ctrl.register));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
    "/verify",
    validation(verifyEmailSchema),
    ctrlWrapper(ctrl.resendVerifyEmail)
  );

router.post('./login',validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.post('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports = router;
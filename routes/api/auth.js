const express = require('express');
const { basedir } = global;

const ctrl = require(`${basedir}/controllers/auth`);

const { ctrlWrapper } = require(`${basedir}/helpers/`);

const router = express.Router();

const { auth ,upload} = require(`${basedir}/middlewares`);

// singup
router.post('/signup', ctrlWrapper(ctrl.register));

router.get("/verify/:verificationToken",ctrlWrapper(ctrl.verifyEmail))

router.post("/verify",ctrlWrapper(ctrl.resendVerifyEmail))

// signin
router.post('/login', ctrlWrapper(ctrl.login));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.patch('/users', auth, ctrlWrapper(ctrl.setSubscription));

router.patch("/avatars",auth, upload.single("avatar"),ctrlWrapper(ctrl.setAvatar))



module.exports = router;

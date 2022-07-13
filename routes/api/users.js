const express = require('express');
const router = express.Router();

const { users: ctrl } = require('../../controllers');
const { validation,auth,upload } = require('../../middlewares');
const ctrlWrapper = require('../../helpers/ctrlWrapper');
const { joiUserSchema  } = require('../../models/users');



router.post('/signup', validation(joiUserSchema, "missing fields"), ctrlWrapper(ctrl.signup))
router.post('/login', validation(joiUserSchema, "missing fields"), ctrlWrapper(ctrl.login))
router.get('/logout',auth,ctrlWrapper(ctrl.logout))

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent))

router.patch('/avatars',auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))






module.exports = router;
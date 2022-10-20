const express = require('express');

const { userAuth, validation, ctrlWrapper, upload } = require('../../middlewares');
const { users: controller } = require('../../controllers');
const { joiSchema } = require('../../models/user');

const router = express.Router();

router.post('/signup', validation(joiSchema), ctrlWrapper(controller.signup));
router.post('/login', validation(joiSchema), ctrlWrapper(controller.login));
router.get('/logout', userAuth, ctrlWrapper(controller.logout));
router.patch('/subscription', userAuth, ctrlWrapper(controller.changeSubscription));
router.patch('/avatars', userAuth, upload.single('avatar'), ctrlWrapper(controller.updateAvatar));

module.exports = router;

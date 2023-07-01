const express = require('express');
const controllers = require('../../../controllers/users');

const router = express.Router();
const {
    validateBody,
    authenticate,
    ImageUploader
} = require('../../../middlewares');

console.log(ImageUploader.save)
const {
    userSchemaJoi,
    userSchemaJoiLogin,
    updateSubscriptionSchemaJoi
} = require('../../../models/user/userModel');

router.post('/register', validateBody(userSchemaJoi), controllers.registerUser);

router.post('/login', validateBody(userSchemaJoiLogin), controllers.loginUser);

router.get('/current', authenticate, controllers.getCurrent);

router.post('/logout', authenticate, controllers.logOut);

router.patch('/:id/subscription',
    validateBody(updateSubscriptionSchemaJoi),
    authenticate,
    controllers.subscriptionUpdate);

router.patch('/avatars',
    authenticate,
    ImageUploader.upload('avatar'),
    ImageUploader.save,
    controllers.updateAvatar);

module.exports = router;
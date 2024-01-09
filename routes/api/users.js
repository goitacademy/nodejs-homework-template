const { Router } = require('express');
const { userController } = require('../../controllers');
const { validateBody, userMiddleware } = require('../../middlewares');
const { userSchema, updateSubscriptionSchema } = require('../../schemas/userSchema');

const router = Router();

router.post('/register', validateBody.checkCreate(userSchema), userController.register);
router.post('/login', validateBody.checkCreate(userSchema), userMiddleware.checkLoginData, userController.login);

router.use(userMiddleware.checkUserByToken)
router.patch('/', validateBody.checkCreate(updateSubscriptionSchema), userController.updateSubscription);
router.post('/logout', userController.logout);
router.get('/current', userController.current);
router.patch('/avatars', userMiddleware.uploadAvatar, userController.uploadAvatar);

module.exports = router;
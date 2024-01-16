const { Router } = require('express');
const { userController } = require('../../controllers');
const { validateBody, userMiddleware } = require('../../middlewares');
const { userSchema, updateSubscriptionSchema, checkEmailSchema } = require('../../schemas/userSchema');

const router = Router();

router.post('/register', validateBody.checkCreate(userSchema), userController.register);
router.get('/verify/:verificationToken', userController.verify);
router.post('/verify',validateBody.checkUpdate(checkEmailSchema), userController.sendVerifyToken);
router.post('/login', validateBody.checkCreate(userSchema), userMiddleware.checkLoginData, userController.login);

router.use(userMiddleware.checkUserByToken)
router.patch('/', validateBody.checkUpdate(updateSubscriptionSchema), userController.updateSubscription);
router.post('/logout', userController.logout);
router.get('/current', userController.current);
router.patch('/avatars', userMiddleware.uploadAvatar, userController.uploadAvatar);

module.exports = router;
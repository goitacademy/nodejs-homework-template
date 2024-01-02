const { Router } = require('express');
const { userController } = require('../../controllers');
const { validateBody, checkLoginData, checkUserByToken } = require('../../middlewares');
const { userSchema, updateSubscriptionSchema } = require('../../schemas/userSchema');

const router = Router();

router.patch('/',checkUserByToken, validateBody.checkCreate(updateSubscriptionSchema), userController.updateSubscription);
router.post('/register', validateBody.checkCreate(userSchema), userController.register);
router.post('/login', validateBody.checkCreate(userSchema), checkLoginData, userController.login);
router.post('/logout', checkUserByToken, userController.logout);
router.get('/current', checkUserByToken, userController.current);

module.exports = router;
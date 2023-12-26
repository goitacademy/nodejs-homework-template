const { Router } = require('express');
const { userController } = require('../../controllers');
const { validateBody, checkLoginData } = require('../../middlewares');
const { userSchema } = require('../../schemas/userSchema');

const router = Router();

router.post('/register', validateBody.checkCreate(userSchema), userController.registerUser);
router.post('/login', validateBody.checkCreate(userSchema), checkLoginData, userController.loginUser);
router.get('/logout');
router.get('/current');

module.exports = router;
const express = require('express')
const router = express.Router()

const { asyncWrapper } = require('../../utils');
const { addNewUserMiddleware, authMiddleware, updateSubscriptionMiddleware } = require('../../middlewares');
const { loginController, registarationController, getUserController, logOutUserController, updateSubscriptionController } = require('../../controllers/auth');

router.patch('/', authMiddleware, updateSubscriptionMiddleware, asyncWrapper(updateSubscriptionController))
router.post('/register', addNewUserMiddleware, asyncWrapper(registarationController))
router.post('/login', addNewUserMiddleware, asyncWrapper(loginController))
router.post('/current', authMiddleware, asyncWrapper(getUserController))
router.post('/logout', authMiddleware, asyncWrapper(logOutUserController))


module.exports = router
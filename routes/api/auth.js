const express = require('express')
const router = express.Router()

const { asyncWrapper } = require('../../utils');
const { addNewUserMiddleware, authMiddleware } = require('../../middlewares');
const { loginController, registarationController, getUserController, logOutUserController } = require('../../controllers/auth');


router.post('/register', addNewUserMiddleware, asyncWrapper(registarationController))
router.post('/login', addNewUserMiddleware, asyncWrapper(loginController))
router.post('/current', authMiddleware, asyncWrapper(getUserController))
router.post('/logout', authMiddleware, asyncWrapper(logOutUserController))


module.exports = router
const express = require('express')
const router = express.Router()

const { asyncWrapper } = require('../../utils');
const { addNewUserMiddleware } = require('../../middlewares');
const { loginController, registarationController, getUserController } = require('../../controllers/auth');


router.post('/register', addNewUserMiddleware, asyncWrapper(registarationController))
router.post('/login', addNewUserMiddleware, asyncWrapper(loginController))
router.post('/current', asyncWrapper(getUserController))


module.exports = router
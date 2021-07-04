const express = require('express')
const router = express.Router()
const {
  registrationController,
  loginController,
  getAllUsers,
} = require('../../controllers/authController')
const { asyncWrapper } = require('../../errorHelpers/apiHelpers')
const { validateUser } = require('../../middlewares/validationMiddleware')

router.post('/register', validateUser, asyncWrapper(registrationController))

router.post('/login', validateUser, asyncWrapper(loginController))
router.get('/', asyncWrapper(getAllUsers))

module.exports = router

const express = require('express')
const router = express.Router()
const {
  registrationController,
  loginController,
  getAllUsers,
} = require('../../controllers/authController')
const { asyncWrapper } = require('../../errorHelpers/apiHelpers')

router.post('/register', asyncWrapper(registrationController))

router.post('/login', asyncWrapper(loginController))
router.get('/', asyncWrapper(getAllUsers))

module.exports = router

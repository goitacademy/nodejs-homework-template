const express = require('express')
const router = express.Router()
const {
  registrationController,
  loginController,
} = require('../controllers/authController')
router.post('/registration', async (req, res) => {
  await registrationController(req, res)
})
router.post('/login', async (req, res) => {
  await loginController(req, res)
})

module.exports = router

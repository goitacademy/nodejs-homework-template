const express = require('express')
const router = express.Router()
const {
  registration,
  logIn,
  logOut,
  findCurrentUser,
  setAvatar,
} = require('../../controllers/usersContr')
const {
  registrationLoginValidation,
} = require('../../middlewares/validationUsers')
const { userMiddleware } = require('../../middlewares/userMiddleware')

router.post('/registration', registrationLoginValidation, registration)

router.post('/login', registrationLoginValidation, logIn)

router.post('/logout', userMiddleware, logOut)

router.get('/current', userMiddleware, findCurrentUser)

router.patch('/avatar', userMiddleware, setAvatar)

module.exports = router

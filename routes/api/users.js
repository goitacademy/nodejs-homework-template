const express = require('express')
const router = express.Router()
const {
  registration,
  logIn,
  logOut,
  findCurrentUser,
  setAvatar,
  verify,
  reVerify,
} = require('../../controllers/usersContr')
const {
  registrationLoginValidation,
  reVerificationUserValidation,
} = require('../../middlewares/validationUsers')
const { userMiddleware } = require('../../middlewares/userMiddleware')
// const { get } = require('mongoose')

router.post('/registration', registrationLoginValidation, registration)

router.post('/login', registrationLoginValidation, logIn)

router.post('/logout', userMiddleware, logOut)

router.get('/current', userMiddleware, findCurrentUser)

router.patch('/avatar', userMiddleware, setAvatar)

router.get('/verify/:token', verify)

router.post('/varify', reVerificationUserValidation, reVerify)

module.exports = router

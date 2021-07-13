const express = require('express')
const controllerUsers = require('../../controllers/users')
const router = express.Router()
const guard = require('../../helpers/guard')
const { createAccountLimiter } = require('../../helpers/reate-limit')
const upload = require('../../helpers/multer')

router.post('/signup', createAccountLimiter, controllerUsers.signup)
router.post('/login', controllerUsers.login)
router.post('/logout', guard, controllerUsers.logout)
router.get('/current', guard, controllerUsers.current)
router.get('/verify/:verificationToken', controllerUsers.verify)
router.patch('/', guard, controllerUsers.subscription)
router.patch(
  '/avatars',
  guard,
  upload.single('avatar'),
  controllerUsers.avatars,
)

module.exports = router

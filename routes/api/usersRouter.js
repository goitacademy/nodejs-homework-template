const express = require('express')
const router = new express.Router()

const { upload } = require('../middlewares/upload')
const { asyncWrapper } = require('../helpers/apiHelpers')

const {
  userRegistration,
  userLogin,
  userGetCurrent,
  userLogOut,
  userSubscription,
  userAvatar,
} = require('../controllers/userController')

const {
  registrationValidator,
  loginValidator,
  subscriptionValidator,
} = require('../middlewares/validation')
const { authMiddleware } = require('../middlewares/authMiddleware')

router.post(
  '/signup',
  upload.single('avatar'),
  registrationValidator,
  asyncWrapper(userRegistration)
)
router.post('/login', loginValidator, asyncWrapper(userLogin))
router.get('/current', authMiddleware, asyncWrapper(userGetCurrent))
router.get('/logout', authMiddleware, asyncWrapper(userLogOut))
router.patch(
  '/subscription',
  authMiddleware,
  subscriptionValidator,
  asyncWrapper(userSubscription)
)
router.patch(
  '/avatars',
  authMiddleware,
  upload.single('avatar'),
  asyncWrapper(userAvatar)
)

module.exports = router

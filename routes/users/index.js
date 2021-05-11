const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/users')
const guard = require('../../helpers/guard')
const rateLimit = require("express-rate-limit")
const { subscription, HttpCode } = require('../../helpers/constants')
const role = require('../../helpers/role')
const { validateCreateUser, validateLogin, validateUpdateSubscription } = require('../users/valid-user-router')
const uploadAvatar = require('../../helpers/upload-avatar')

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Too many requests',
    })
  },
});

router.patch('/', guard, validateUpdateSubscription, ctrl.updateSubscription)
router.post('/signup', validateCreateUser, limiter, ctrl.signup)
router.post('/login', validateLogin, ctrl.login)
router.post('/logout', guard, ctrl.logout)
router.get('/current', guard, ctrl.current)

router.get('/starter', guard, role(subscription.STARTER), ctrl.onlyStarter)
router.get('/pro', guard, role(subscription.PRO), ctrl.onlyPro)
router.get('/business', guard, role(subscription.BUSINESS), ctrl.onlyBusiness)

router.patch(
  '/avatars',
  guard,
  uploadAvatar.single('avatar'),
  ctrl.updateUserAvatar)

module.exports = router

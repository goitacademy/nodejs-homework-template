const { json } = require('express')
const express = require('express')
const rateLimit = require("express-rate-limit");
const { reset } = require('nodemon')
const router = express.Router()
const control = require('../../controllers/users')
const guard = require('../../helpers/guard')
const uploadAvatar = require('../../helpers/upload-avatar')
const {reg, login, logout, getCurrent, updateAvatar } = require('../../controllers/users')

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    return res.status(429).json({
      status: 'error',
      code: 429,
      message:'too many requests'
    })
  }
});

router.post('/register',limiter, reg)
router.post('/login',login )
router.post('/logout', guard, logout)
router.get('/current', guard, getCurrent)
router.patch('/avatars', guard, uploadAvatar.single('avatar'), updateAvatar)

module.exports = router

const { json } = require('express')
const express = require('express')
const rateLimit = require("express-rate-limit");
const { reset } = require('nodemon')
const router = express.Router()
const control = require('../../controllers/users')
const guard = require('../../helpers/guard')
const {reg, login, logout, getCurrent } = require('../../controllers/users')

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
//  apply to all requests

// router.post('/register',control.reg)
router.post('/register',limiter, reg)
// router.post('/login',control.login )
router.post('/login',login )
// router.post('/logout',control.logout )
router.post('/logout', guard, logout)
router.get('/current',guard, getCurrent)



// router
//   .get('/', control.getAll)
//   .post('/', validationCreateContact, handleError(control.create))

// router
//   .get('/:contactId', validationObjectId, control.getById)
//   .put('/:contactId', validationUpdateContact, validationObjectId, control.update)
//   .delete('/:contactId', validationObjectId, control.remove)
//   .patch("/:contactId", validationUpdateContact, validationObjectId, control.updateStatus)

module.exports = router

const express = require('express')
const { validateCreateUser, validateUpdateSubscriptionUser } = require('../../validation/validateUser')
const router = express.Router()

const {
  getuserByEmail,
  addUser,
  updateSubscriptionUser,
  getuserByToken
} = require('../../model/user.js')
const {
  login,
  logout
} = require('../../model/auth')

router.post('/login', async (req, res, next) => {
  try {
    const user = await login(req.body.email, req.body.password)
    if (user) {
      res.json({
        status: 'Success',
        code: 200,
        data: user
      })
    } else {
      next({
        code: 401,
        message: 'Invalid login or password',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.post('/logout', async (req, res, next) => {
  try {
    const user = await logout(req.body._id)
    if (user) {
      res.json({
        status: 'Success',
        code: 204,
      })
    } else {
      next({
        code: 401,
        message: 'Not authorized',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.post('/signup', validateCreateUser, async (req, res, next) => {
  try {
    const user = await getuserByEmail(req.body.email)
    if (user) {
      return next({
        status: 409,
        data: 'Conflict',
        message: 'This email is already in use'
      })
    }
    if (req.body.name && req.body.email && req.body.password) {
      const user = await addUser(req.body)
      res.json({
        status: 'Success',
        code: 201,
        data: {
          name: user.name,
          email: user.email
        }
      })
    } else {
      res.json({
        code: 400,
        message: 'Missing required name, email or password field'
      })
    }
  } catch (e) {
    next(e)
  }
})

router.patch('/:userId/subscription', validateUpdateSubscriptionUser, async (req, res, next) => {
  try {
    if (req.body.subscription) {
      const updatedUser = await updateSubscriptionUser(req.params.userId, req.body)
      if (updatedUser) {
        res.json({
          status: 'Success',
          code: 200,
          data: updatedUser
        })
      } else {
        res.json({
          code: 404,
          message: 'Not found'
        })
      }
    } else {
      res.json({
        code: 400,
        message: 'Missing field subscription'
      })
    }
  } catch (e) {
    next(e)
  }
})

router.get('/current', async (req, res, next) => {
  try {
    const user = await getuserByToken(req.rawHeaders[1])
    if (user) {
      res.json({
        status: 'Success',
        code: 200,
        data: user
      })
    } else {
      next({
        code: 401,
        message: 'Not authorized',
      })
    }
  } catch (e) {
    next(e)
  }
})

module.exports = router

const express = require('express')
const { validateCreateUser } = require('../../validation/validateUser')
const router = express.Router()

const {
  getuserByEmail,
  addUser,
  updateSubscriptionUser
} = require('../../model/user.js')
const {
  login,
  logout
} = require('../../model/auth')

router.post('/api/users/login', async (req, res, next) => {
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

router.post('/api/users/logout', async (req, res, next) => {
  try {
    const user = await logout(req.body.email, req.body.password)
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

router.post('/api/users/signup', async (req, res, next) => {
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
          id: user.id,
          name: user.name,
          email: user.email,
          subscription: 'starter',
          token: null
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

router.patch('/api/users/:userId/subscription', validateUpdateSubscriptionUser, async (req, res, next) => {
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

module.exports = router

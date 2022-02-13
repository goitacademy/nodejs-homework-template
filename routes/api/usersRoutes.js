const express = require('express')
const router = express.Router()
const {User} = require('../../model/User');

router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({email})
  if (user) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Email is already in use',
      data: 'Conflict',
    })
  }
  try {
    const newUser = new User({ username, email })
    newUser.setPassword(password)
    await newUser.save()
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        message: 'Registration successful',
      },
    })
  } catch (error) {
    next(error)
  }
})
module.exports = router

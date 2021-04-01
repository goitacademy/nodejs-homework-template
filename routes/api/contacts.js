const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = express.Router()
const contactsServices = require('../../model/services/contacts')
const authServices = require('../../model/services/auth')
const User = require('../../model/schemas/user')

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        code: 401,
        message: 'Not authorized',
      })
    }
    req.user = user
    next()
  })(req, res, next)
}

router.post('/auth/register', async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      code: 400,
      message: 'Missing required email or password field.',
    })
  }
  const validationMessage = authServices.validateUserFields(email, password)
  if (validationMessage) {
    return res.status(400).json({
      code: 400,
      message: validationMessage,
    })
  }
  const user = await User.findOne({ email })
  if (user) {
    return res.status(409).json({
      code: 409,
      message: 'Email in use',
    })
  }
  const { data } = await authServices.registration(req.body)
  if (data) {
    return res.status(201).json({
      code: 201,
      user: data,
    })
  }
})

router.post('/auth/login', async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      code: 400,
      message: 'Missing required email or password field.',
    })
  }
  const validationMessage = authServices.validateUserFields(email, password)
  if (validationMessage) {
    return res.status(400).json({
      code: 400,
      message: validationMessage,
    })
  }
  const user = await User.findOne({ email })
  if (!user || !user.validPassword(password)) {
    return res.status(401).json({
      code: 401,
      message: 'Email or password is wrong',
    })
  }
  const payload = {
    email: user.email,
    subscription: user.subscription,
  }
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
  await user.updateOne({ token: token })
  return res.status(200).json({
    code: 200,
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  })
})

router.post('/auth/logout', auth, async (req, res, next) => {
  const { id } = req.user
  const user = await User.findOneAndUpdate({ id }, { token: '' }, { useFindAndModify: false })
  if (!user) {
    return res.status(401).json({
      code: 401,
      message: 'Not authorized',
    })
  }
  return res.status(204).json()
})

router.get('/users/current', auth, async (req, res, next) => {
  const { id } = req.user
  const user = await User.findOne({ id })
  if (!user) {
    return res.status(401).json({
      code: 401,
      message: 'Not authorized',
    })
  }
  return res.status(200).json({
    code: 200,
    email: user.email,
    subscription: user.subscription,
  })
})

router.get('/', auth, async (req, res, next) => {
  const data = await contactsServices.listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: data,
  })
})

router.get('/:contactId', auth, async (req, res, next) => {
  const { contactId } = req.params
  const data = await contactsServices.getContactById(contactId)
  if (data) {
    res.json({
      status: 'success',
      code: 200,
      data: data,
    })
  } else {
    res.status(404).json({
      message: 'not found',
      code: 404,
    })
  }
})

router.post('/', auth, async (req, res, next) => {
  const { data, message } = await contactsServices.addContact(req.body)
  if (data) {
    res.status(201).json({
      code: 201,
      data: data,
    })
  } else {
    res.status(400).json({
      message: `Missing required fields. ${message}`,
      code: 400,
    })
  }
})

router.delete('/:contactId', auth, async (req, res, next) => {
  const { contactId } = req.params
  const data = await contactsServices.removeContact(contactId)
  if (data) {
    res.json({
      message: 'contact deleted',
      code: 200,
    })
  } else {
    res.status(404).json({
      message: 'not found',
      code: 404,
    })
  }
})

router.patch('/:contactId', auth, async (req, res, next) => {
  const { contactId } = req.params
  const { name, email, phone } = req.body
  if (name || email || phone) {
    const data = await contactsServices.updateContact(contactId, req.body)
    if (data) {
      res.json({
        code: 200,
        data: data,
      })
    } else {
      res.status(404).json({
        message: 'not found',
        code: 404,
      })
    }
  } else {
    res.status(400).json({
      message: 'missing fields',
      code: 400,
    })
  }
})

module.exports = router

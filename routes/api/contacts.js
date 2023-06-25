const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv').config()
// const gravatar = require('gravatar')

const {
  Contact,
  updateStatusContact
} = require('../../models/contacts')

const User = require('../../models/users')

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if(!user || err) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        data: 'Unauthorized',
        message: 'Not authorized',
      })
    }
    req.user = user
    next()
  })(req, res, next)
}

router.post('/users/signup', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return res.json({
      status: "error",
      code: 409,
      data: "Conflict",
      message: "Email in use"
    })
  }
  try {
    const newUser = new User({ email })

    newUser.setPassword(password)

    // gravatar.url({ email })

    await newUser.save()

    res.json({
      status: "success",
      code: 201,
      data: "Created",
      message: "Register complete!"
    })
  } catch (error) {
    next(error)
  }
})

router.post('/users/login', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if(!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 400,
      data: "Bad request",
      message: "Incorrect login or password"
    })
  }

  const payload = {
    id: user.id,
  }

  const secret = process.env.SECRET

  const token = jwt.sign(payload, secret, { expiresIn: '1h' })

  return res.json({
    status: "success",
    code: 200,
    data: {
      token
    }
  })
})

router.get('/users/logout', auth, async (req, res, next) => {
  const id = req.user._id;
  const user = await User.findById(id);

  if(!user) {
      return res.json({
      status: "error",
      code: 401,
      data: "Unauthorized",
      message: "Not authorized"
    })
  } 

  token = null;
  await user.save()
    
  return res.json({
    status: "success",
    code: 204,
    message: "Logout successful"
  })
})

router.get('/users/current', auth, async (req, res, next) => {
  const email = req.user.email;
  const subscription = req.user.subscription;
  const id = req.user._id;
  const user = await User.findById(id);

  if(!user) {
    return res.json({
      status: "error",
      code: 401,
      data: "Unauthorized",
      message: "Not authorized"
    })
  }

  return res.json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription
    },
    message: `Current user is ${email}`
  })
})

router.get('/contacts', auth, async (req, res, next) => {
  const contacts = await Contact.find(); 
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts: contacts
    },
  })
})

router.get('/contacts/:contactId', auth, async (req, res, next) => {
  const contact = await Contact.findOne({ _id: req.params.contactId })
  if(contact) {
    res.json({
      status: 'success',
      code: 200,
      data: {
        contact: contact
      }
    })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

router.post('/contacts', auth, async (req, res, next) => {
  const newContact = await Contact.create(req.body)
  if(newContact){
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact: newContact
      }
    })
  } else {
    res.status(400).json({ message: "Missing required name - field" })
  }
})

router.delete('/contacts/:contactId', auth, async (req, res, next) => {
  const contact = await Contact.deleteOne({ _id: req.params.contactId })
  if(contact){
    res.status(200).json({ message: 'Contact deleted' })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

router.put('/contacts/:contactId', auth, async (req, res, next) => {
  const updatedContact = await Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body , { new: true })

  if(updatedContact){
    res.status(200).json(updatedContact)
  }
  else{
    res.status(404).json({ message: 'Not Found' })
  }
})

router.patch('/contacts/:contactId/favorite', auth, async (req, res, next) => {
  const contact = await updateStatusContact({ _id: req.params.contactId }, req.body)

  const data = await updateStatusContact({ _id: req.params.contactId }, req.body)
  const params = await updateStatusContact({ _id: req.params.contactId })
  const body = await updateStatusContact(req.body)

  if(contact){
    res.status(200).json(contact)
  }
  else if(params && !body) {
    res.status(400).json({ "message": "missing field favorite" })
  }
  else if(!data){
    res.status(404).json({ message: "Not found" })
  }
})

module.exports = router

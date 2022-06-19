const express = require('express')

const router = express.Router()

const action = require('../../models/contacts')
const Joi = require('joi');

const postSchema = Joi.object({
  name: Joi.string().max(50).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }).required(),
  phone: Joi.string().pattern(/^[0-9+()-_ ]*$/).max(20).required()
})
router.get('/', async (req, res, next) => {
  try {
    const result = await action.listContacts()
    res.json(result)
  } catch (error) { next(error)
    // const {status = 500, message = "Server error"} = error
    // res.status(status).json({ message })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await action.getContactById(req.params.contactId)
    if (!result) {
      const error = new Error('Not Found')
      error.status = 404
      throw error
    }
    res.json(result)
  } catch (error) { next(error)
    // const {status = 500, message = "Server error"} = error
    // res.status(status).json({ message })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = postSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw new Error(error.message)
    }
    // if (!req.body.name || !req.body.email || !req.body.phone) {
    //   const error = new Error('missing required name field')
    //   error.status = 400
    //   throw error
    // }
      const result = await action.addContact(req.body)
      res.json(result)
  } catch (error) { next (error)
    // const {status = 500, message = "Server error"} = error
    // res.status(status).json({ message })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await action.removeContact(req.params.contactId)
    if (result === null) {
      const error = new Error('Not found')
      error.status = 404
      throw error
    }
    res.json({ message: 'contact deleted' })
  } catch (error) { next(error)
    // const { status = 500, message = "Server error" } = error
    // res.status(status).json({message})
  }

})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {name, email, phone} = req.body
    if (!name && !email && !phone) {
      const error = new Error('missing fields')
      error.status = 400
      throw error
    }
    const result = await action.updateContact(req.params.contactId, req.body)
    if (result === null) { // если контакта с таким id нет
      const error = new Error('Not Found')
      error.status = 404
      throw error
    }
    res.json(result)
  } catch (error) { next(error) }
  
})

module.exports = router

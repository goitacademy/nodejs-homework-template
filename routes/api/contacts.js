const express = require('express')
const router = express.Router()
const contactsOperation = require('../../model/index')
const Joi = require('joi')
const { v4 } = require('uuid')

router.get('/', async (req, res, next) => {
  try {
    const data = await contactsOperation.listContacts()
    res.statusCode = 200
    res.json({
      message: 'Все ок',
      result: data
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const data = await contactsOperation.getContactById(contactId)
    if (data) {
      res.statusCode = 200
      res.json({
        message: 'Все ок',
        result: data
      })
    } else {
      res.statusCode = 404
      res.json({ message: 'Contact not found' })
    }
  } catch (err) {
    console.log(err)
  }
})

router.post('/', express.json(), async (req, res, next) => {
  const contactSchema = Joi.object({
    name: Joi.required(),
    email: Joi.required(),
    phone: Joi.required()

  })
  try {
    await contactSchema.validateAsync(req.body)
    const body = {
      id: v4(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    }
    const data = await contactsOperation.addContact(body)
    res.statusCode = 201
    res.json(data)
  } catch (err) {
    res.statusCode = 400
    res.json({
      status: 'Error',
      message: err.details[0].message
    })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const data = await contactsOperation.removeContact(contactId)
    if (data) {
      res.statusCode = 200
      res.json({
        message: 'contact deleted',
        result: data
      })
    } else {
      res.statusCode = 404
      res.json({ message: 'Contact not found' })
    }
  } catch (err) {
    console.log(err)
  }
})

router.patch('/:contactId', express.json(), async (req, res, next) => {
  const { contactId } = req.params
  const contactSchema = Joi.object({

    name: Joi.any(),
    email: Joi.any(),
    phone: Joi.any()

  }).or('name', 'email', 'phone')
  try {
    await contactSchema.validateAsync(req.body)
    const body = {

      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    }

    const data = await contactsOperation.updateContact(contactId, body)
    res.statusCode = 201

    res.json(data)
  } catch (err) {
    res.statusCode = 404
    res.json({
      status: 'Error',
      message: err.details[0].message
    })
  }
})

module.exports = router

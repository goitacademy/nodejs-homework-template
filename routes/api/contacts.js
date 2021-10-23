const express = require('express')
const router = express.Router()
const contactsOperations = require('../../model')
const { contactSchema } = require('../../validation')

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts()
    res.json({
      status: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.getContactById(contactId)
    if (!result) {
      const error = new Error('Not found')
      error.status = 404
      throw error
    }
    res.json({
      status: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    await contactSchema.addContact.validate(req.body, {
      abortEarly: false,
    })
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: 201,
      data: {
        result,
      },
    })
  } catch (error) {
    try {
      const { name, errors } = error
      const err = new Error(`${name}: ${errors.join(', ')}`)
      err.status = 400
      throw err
    } catch (error) {
      next(error)
    }
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.removeContact(contactId)
    if (!result) {
      const error = new Error('Not found')
      error.status = 404
      throw error
    }
    res.json({
      status: 200,
      message: 'contact deleted',
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    await contactSchema.updateContact.validate(req.body, {
      abortEarly: false,
    })
    const result = await contactsOperations.updateContact(contactId, req.body)
    if (!result) {
      const error = new Error('Not found')
      error.status = 404
      throw error
    }
    res.json({
      status: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const { name, errors } = error
      const err = new Error(`${name}: ${errors.join(', ')}`)
      err.status = 400
      throw err
    }
    next(error)
  }
})

module.exports = router

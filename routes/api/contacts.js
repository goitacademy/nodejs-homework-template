const express = require('express')
const router = express.Router()
const contactsOperations = require('../../model')
const { contactsSchema } = require('../../schemas')

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: result
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
      const error = new Error(`Product with id=${contactId} not found`)
      error.status = 404
      throw error
    }

    res.json({
      status: 'seccess',
      code: 200,
      data: result
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)

    if (error) {
      const field = error.details[0].path[0]

      const err = new Error(`missing required ${field} field`)
      err.status = 400
      throw err
    }

    const result = await contactsOperations.addContact(req.body)
    res.statusCode = 201
    res.json({
      status: 'seccess',
      code: 201,
      data: result
    })
  } catch (error) {
    next(error)
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
      status: 'seccess',
      code: 200,
      message: result
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.updateContact(contactId, req.body)

    if (!result) {
      const error = new Error('Not found')
      error.status = 404
      throw error
    }

    res.json({
      status: 'seccess',
      code: 200,
      data: result
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { error } = contactsSchema.validate(req.body)

    if (error) {
      const field = error.details[0].path[0]

      const err = new Error(`missing required ${field} field`)
      err.status = 400
      throw err
    }

    const result = await contactsOperations.updateContact(contactId, req.body)

    if (!result) {
      const error = new Error('Not found')
      error.status = 404
      throw error
    }

    res.json({
      status: 'seccess',
      code: 200,
      data: result
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router

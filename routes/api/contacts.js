const express = require('express')
const contactsOperation = require('../../model/contacts')
const { contactShema } = require('../../schemas')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperation.getContactById(contactId)
    if (!result) {
      const error = new Error(`Product with id = ${contactId} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
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
    const { error } = contactShema.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      throw err
    }
    const result = await contactsOperation.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperation.removeContact(contactId)
    if (!result) {
      const error = new Error(`Product with id=${contactId} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Success delete',
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactShema.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      throw err
    }
    const { contactId } = req.params
    const result = await contactsOperation.updateById(contactId, req.body)
    if (!result) {
      const error = new Error(`Product with id=${contactId} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router

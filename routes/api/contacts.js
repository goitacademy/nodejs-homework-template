const express = require('express')
const router = express.Router()

const contactsData = require('../../model/index')

const {
  addValidationContact,
  updateValidationContact,
} = require('./validationContact')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsData.listContacts()

    return res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await contactsData.getContactById(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'The data was not found',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', addValidationContact, async (req, res, next) => {
  try {
    const contact = await contactsData.addContact(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact },
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await contactsData.removeContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 201,
        message: 'The contact was dleted',
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'The contact was not found',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', updateValidationContact, async (req, res, next) => {
  try {
    const contact = await contactsData.updateContact(
      req.params.contactId,
      req.body
    )
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'The contact was not found',
      })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router

const express = require('express')
const router = express.Router()

const { contactSchema } = require('../../validation')
const contactsOperations = require('../../contactsData')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contactsOperations.getContactById(contactId)
    if (!contact) {
      return res.status(404).json({
        message: 'not found'
      })
    }
    res.json({
      contact
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: 'missing required name field'
      })
    }
    const newContact = await contactsOperations.addContact(req.body)
    res.status(201).json({
      newContact
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: 'missing required name field'
      })
    }
    const { contactId } = req.params
    const updateContact = await contactsOperations.updateContact(contactId, req.body)
    res.status(200).json({
      updateContact
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deleteContact = await contactsOperations.removeContact(contactId)
    if (!deleteContact) {
      return res.status(404).json({
        message: 'not found'
      })
    }
    res.json({
      deleteContact,
      message: 'contact deleted'
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router

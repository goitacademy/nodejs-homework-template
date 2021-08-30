const express = require('express')
const router = express.Router()

const contactsOperations = require('../../model')
const validate = require('../../validation/validationContactSchema')

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      contacts,
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
        message: 'Not found',
      })
    }
    res.json({
      contact,
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', validate.addContact, async (req, res, next) => {
  try {
    const newContact = await contactsOperations.addContact(req.query)
    res.status(201).json({
      newContact,
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
        message: 'Not found',
      })
    }
    res.json({
      deleteContact,
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', validate.updateContact, async (req, res, next) => {
  try {
    const id = req.params.id
    const updateContact = await contactsOperations.updateContact(id, req.body)
    if (!updateContact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }
    res.json({
      updateContact,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router

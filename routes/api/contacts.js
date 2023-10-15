const express = require('express')
const contacts = require('../../models/contacts')
const requestError = require('../../helpers/requestError')
const contactSchema = require('../../schema/schema')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId)
    if (!result) {
      throw requestError(404);
    }
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {name, email, phone} = req.body
    const result = await contacts.addContact(name, email, phone)
    const { error } = contactSchema.validate(req.body)
    if (error) {
      res.status(400).json({"message": "missing required name field"})
    }
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId)
    if (!result) {
      throw requestError(404);
    }
    res.json({"message": "contact deleted"})
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const {name, email, phone} = req.body
    const result = await contacts.updateContact(contactId, name, email, phone)
    const { error } = contactSchema.validate(req.body)
    if (error) {
      res.status(400).json({"message": "missing fields"})
    }
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router

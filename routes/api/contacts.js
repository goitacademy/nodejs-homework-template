const express = require('express')
const contacts = require('../../models/contacts')
const Joi = require("joi");

const router = express.Router()

const schemaCreateContacts = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const schemaUpdateContacts = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
})
  .or("name", "email", "phone")

router.get('/', async (req, res, next) => {
  const contactList = await contacts.listContacts()

  res.json({
    status: 'success',
    code: 200,
    data: {
      contactList
    },
  })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId)

  if (contact === null) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      contact
    },
  })
})

router.post('/', async (req, res, next) => {
  const { name, phone, email } = req.body;
  const { error, value } = schemaCreateContacts.validate({ name, phone, email })

  if (error) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const addContact = await contacts.addContact(value)

  res.json({
    status: 'success',
    code: 201,
    data: {
      addContact
    },
  })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  const deleteContact = await contacts.removeContact(contactId)
  if (deleteContact === null) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({
    code: 200,
    message: "contact deleted"
  })
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const { name, phone, email } = req.body;
  const { error, value } = schemaUpdateContacts.validate({ name, phone, email })

  if (error) {
    return res.status(400).json({ message: "missing fields" });
  }

  const updContact = await contacts.updateContact(contactId, value)

  if (updContact === null) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      updContact
    },
  })
})

module.exports = router

const express = require('express')
const contacts = require("../../models/contacts")

const router = express.Router()

router.get('/', async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result)
})

router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const contactById = await contacts.getContactById(contactId);
  res.json(contactById);
})

router.post('/', async (req, res, next) => {
  const newContact = await contacts.addContact(req.body);
  res.json(newContact)
})

router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const deleteContact = await contacts.removeContact(contactId)
  res.json(deleteContact)

})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router

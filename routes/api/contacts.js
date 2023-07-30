const express = require('express')

const contacts = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
})

router.get('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;

  const contactByID = await contacts.getContactById(contactId);
  res.json(contactByID)
 
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const removeContactById = await contacts.removeContact(contactId)
  res.json(removeContactById)
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router

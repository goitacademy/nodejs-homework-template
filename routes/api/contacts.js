const express = require('express');
const contactsApi = require('../../models/contacts.js');

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await contactsApi.listContacts();
  // console.log(contacts);
  res.status(200).json( contacts )
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await contactsApi.getContactById(id);
  res.json({ message: 'template message', contact })
})

router.post('/', async (req, res, next) => {
  const data = req.body;
  const contact = await contactsApi.addContact(data);
  res.json({ message: 'template message',contact })
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await contactsApi.removeContact(id);
  res.json({ message: 'template message', contact })
})

router.put('/:contactId', async (req, res, next) => {
  const id = req.params;
  const contact = await contactsApi.updateContact(id);
  res.json({ message: 'template message', contact })
})

module.exports = router

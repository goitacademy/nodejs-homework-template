const express = require('express')

const { listContacts, getContactById, addContact} = require('../../models/contacts');

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = JSON.parse(await listContacts());
  res.json({ contacts, message: 'success' });
})


router.get('/:contactId', async (req, res, next) => {  
  const contact = await getContactById(req.params.contactId);
  res.json({ contact, message: 'success' });
})

router.post('/', async (req, res, next) => {
  const contact = await addContact(req.body);
  res.json({ contact, message: 'success' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'success' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'success' })
})

module.exports = router

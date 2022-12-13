const express = require('express');
// const contacts = require('./contacts');
// const {listContacts, 
//   getContactById, 
//   removeContact, 
//   addContact, 
//   updateContact} = require('./contacts');

const router = express.Router()

router.get('/', async (req, res, next) => {
  // const contacts = await listContacts();
  // res.json(contacts);
  // next();
  res.json({ message: 'template message' })
})

router.get('/:contactId', async (req, res, next) => {
  // const selectedContact = await getContactById(id);
  // res.json(selectedContact);
  // next();
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router

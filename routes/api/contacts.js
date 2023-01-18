const express = require('express');
const contactsApi = require('../../models/contacts.js');

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await contactsApi.listContacts();
  // console.log(contacts);
  res.json({ message: 'template message', contacts })
})

router.get('/:contactId', async (req, res, next) => {
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

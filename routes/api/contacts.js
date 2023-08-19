const express = require('express')

const router = express.Router();
const models = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  const { listContacts } = models;
  const allContacts = await listContacts();
  console.log(allContacts)
  res.send(allContacts)
})

router.get('/:contactId', async (req, res, next) => {
  const { getContactById } = models;
  const { id } = req.params;
  const contact = await(getContactById(id))
  res.json(contact)
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

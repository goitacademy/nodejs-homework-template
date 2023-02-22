const express = require('express')

const router = express.Router()
const { listContacts, getContactById, addContact, removeContact } = require('../../models/contacts')



router.get('/', async (req, res, next) => {
  const data = await listContacts();
  res.json({
    status: 'success',
    code: 200,
    data,
  })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const data = await getContactById(contactId);
  res.json({
    status: 'success',
    code: 200,
    data,
  })
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body
  const data = await addContact({ name, email, phone });
  res.status(201).json({
    status: 'success',
    code: 201,
    data,
  })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  await removeContact(contactId);
  res.status(204).json({
  })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router

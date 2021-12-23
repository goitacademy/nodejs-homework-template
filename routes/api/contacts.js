const express = require('express')
const router = express.Router()
const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact } = require('../../model/index')

router.get('/', async (req, res, next) => {
  const products = await listContacts()
  console.log('11111');
  res.json({ products })
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

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router

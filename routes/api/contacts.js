const express = require('express')
const router = express.Router()
const { listContacts, getContactById } = require('../../model');

router.get('/', listContacts);

router.get('/:contactId', getContactById);

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
